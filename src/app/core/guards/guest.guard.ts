import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.authService.getAccessToken();
    return token ? this.router.parseUrl('/home') : true;
  }
}
