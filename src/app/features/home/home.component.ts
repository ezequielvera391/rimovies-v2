import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmsService } from 'src/app/core/films.service';
import { FilmCardComponent } from "../films/film-card/film-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilmCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public recommendedFilms: Film[] = [];

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.filmService.loadRecommendedFilms().subscribe({
      next: (res: Film[]) => {
        this.recommendedFilms = res;
      },
    });
  }
}
