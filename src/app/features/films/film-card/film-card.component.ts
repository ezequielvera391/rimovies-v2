import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from "../../../shared/card/base-card.component";
import { Router } from '@angular/router';
import { Film } from 'src/app/core/interfaces/films.interface';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule, BaseCardComponent],
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  public detailIcon: string;
  public favIcon: string;
  public goToUrl: string;
  @Input() data: Film;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' = 'medium';

  constructor(private router: Router) {
    this.detailIcon = 'assets/images/icons/detail-eye.svg';
    this.favIcon = 'assets/images/icons/favorite.svg';
  }
  ngOnInit(): void {
    this.goToUrl = 'films/' + this.data.id;
  }

  navigateTo(event: Event) {
    event.stopPropagation();
    // * le paso data por ruta, pero en un futuro cuando llegue films/:id va a buscar la información a un servicio
    this.router.navigate(['films/', this.data.id], {
      state: { filmData: this.data },
    });
  }

  addToFavorites(event: Event) {
    event.stopPropagation();
    console.log('Añadir a favoritos');
  }
}
