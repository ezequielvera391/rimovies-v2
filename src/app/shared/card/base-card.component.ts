import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss'],
})
export class BaseCardComponent {
  @Input() imageUrl!: string;
  @Input() goToUrl?: string;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' = 'medium';

  constructor(private router: Router) {}

  navigateTo() {
    if (this.goToUrl) {
      this.router.navigate([this.goToUrl]);
    }
  }
}
