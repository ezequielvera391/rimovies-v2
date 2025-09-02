import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public logoPath = 'assets/images/logos/logo-texto.png';
  public isScrolled: boolean;
  @Input() navLinks: { name: string; path: string }[];

  constructor(private router: Router, private authService: AuthService) {}

  public redirectTo(path: string): void {
    this.router.navigate([path]);
  }

  public handleKeydown(event: KeyboardEvent, path: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.redirectTo(path);
    }
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    })
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
