import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/core/interfaces/films.interface';
import { BackdropImageComponent } from 'src/app/shared/backdrop-image/backdrop-image.component';
import { BaseCardComponent } from 'src/app/shared/card/base-card.component';
import { ChipComponent } from "../../../shared/chip/chip.component";
import { DividerComponent } from 'src/app/shared/divider/divider.component';
import { FilmsService } from 'src/app/core/films.service';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [
    CommonModule,
    BackdropImageComponent,
    BaseCardComponent,
    ChipComponent,
    DividerComponent,
  ],
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent {
  public id: string;
  public data: Film;
  public size: 'x-small' | 'small' | 'medium' | 'large' = 'large';
  public detailIcon: string;
  public recommendedFilms: Film[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filmService: FilmsService
  ) {
    // TODO: reemplazar por llamado a servicio, obtener pelicula cuando este listo
    this.data = this.router.getCurrentNavigation()?.extras?.state?.['filmData'];
    if (!this.data) {
      this.router.navigate(['/']);
    }
    this.detailIcon = 'assets/images/icons/add_circle.svg';
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getRecommendedFilms();
  }

  private getRecommendedFilms(): void {
    this.filmService.loadRecommendedFilms().subscribe({
      next: (res: Film[]) => {
        this.recommendedFilms = res;
      },
    });
  }
}
