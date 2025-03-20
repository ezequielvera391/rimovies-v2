import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from "../../../shared/card/base-card.component";

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule, BaseCardComponent],
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent {
  public detailIcon: string;
  public favIcon: string;
  @Input() imageUrl: string;
  @Input() goToUrl: string;

  constructor() {
    this.detailIcon = 'assets/images/icons/detail-eye.svg';
    this.favIcon = 'assets/images/icons/favorite.svg';
  }

  navigateTo(event: Event) {
    event.stopPropagation(); // Evita que el `click` active la card base
    // Lógica para ir a detalles
  }

  addToFavorites(event: Event) {
    event.stopPropagation();
    console.log('Añadir a favoritos');
  }
}
