import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // Añador las rutas públicas que no necesitan autenticación
  private readonly PUBLIC_ROUTES: string[] = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh-token',
    '/auth/forgot-password',
  ];

  private isPublicRoute(url: string): boolean {
    return this.PUBLIC_ROUTES.some((route) => url.includes(route));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 🔒 Si es ruta pública, la dejamos pasar tal cual
    if (this.isPublicRoute(req.url)) {
      return next.handle(req);
    }

    const accessToken = this.authService.getAccessToken();

    // 1. Agregamos el token si existe
    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 2. Si el error fue 401, intentamos hacer refresh
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((res) => {
              const newAccessToken = res.accessToken;
              this.authService.setAccessToken(newAccessToken);

              // 3. Reintentamos la request original con el nuevo token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              return next.handle(retryReq);
            }),
            catchError((err) => {
              // 4. Si falló el refresh, propagamos el error original
              this.authService.clearAccessToken();
              return throwError(() => error);
            })
          );
        }

        // Si no fue 401, simplemente pasamos el error
        return throwError(() => error);
      })
    );
  }
}
