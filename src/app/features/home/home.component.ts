import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmsService } from 'src/app/core/films.service';
import { FilmCardComponent } from "../films/film-card/film-card.component";
import { BackdropImageComponent } from 'src/app/shared/backdrop-image/backdrop-image.component';
import { timer, concatMap, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilmCardComponent, BackdropImageComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  public recommendedFilms: Film[] = [];
  public posterUrl: string;
  private destroy$ = new Subject<void>();

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.getRecommendedFilms();
  }

  private getRecommendedFilms(): void {
    this.filmService
      .loadRecommendedFilms()
      .pipe(
        concatMap((res: Film[]) => {
          this.recommendedFilms = res;
          this.posterUrl = this.recommendedFilms[0].poster_url;
          return timer(0, 10000);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.rotatePoster();
        },
      });
  }

  private rotatePoster(): void {
    if (this.recommendedFilms.length) {
      const currentIndex = this.recommendedFilms.findIndex(
        (film) => film.poster_url === this.posterUrl
      );
      const nextIndex = (currentIndex + 1) % this.recommendedFilms.length;
      this.posterUrl = this.recommendedFilms[nextIndex].poster_url;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
