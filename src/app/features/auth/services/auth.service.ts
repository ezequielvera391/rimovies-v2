import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { loginResponse } from 'src/app/core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth';
  private accessToken$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  public login(
    identifier: string,
    password: string
  ): Observable<loginResponse> {
    let loginUrl: string = this.url + '/login';
    return this.http
      .post<loginResponse>(loginUrl, { identifier, password })
      .pipe(
        tap((response) => {
          this.setAccessToken(response.access_token);
        })
      );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<loginResponse> {
    let registerUrl: string = this.url + '/register';
    return this.http
      .post<loginResponse>(registerUrl, {
        username,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.setAccessToken(response.access_token);
        })
      );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {}).pipe(
      tap(() => {
        this.clearAccessToken();
      })
    );
  }

  public refreshToken(): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.url}/refresh-token`, {})
      .pipe(
        tap((response) => {
          this.setAccessToken(response.accessToken);
        })
      );
  }

  // TOKEN MANAGEMENT
  public getAccessToken(): string | null {
    return this.accessToken$.value;
  }

  public setAccessToken(token: string): void {
    this.accessToken$.next(token);
  }

  public clearAccessToken(): void {
    this.accessToken$.next(null);
  }

  // (opcional) para observar cambios
  public accessTokenChanges(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }
}
