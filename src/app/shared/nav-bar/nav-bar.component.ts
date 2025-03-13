import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public logoPath = 'assets/images/logos/logo-texto.png';
  public navLinks = [{name: 'Home', path: '/'}, {name: 'Films', path: '/films'}]

  constructor(private router: Router){}

  public redirectTo(path:string): void {
    this.router.navigate([path])
  }
}
