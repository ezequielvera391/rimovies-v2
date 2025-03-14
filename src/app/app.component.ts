import { Component, OnInit } from '@angular/core';
import { FilmsService } from './core/films.service';
import { concatMap, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading: boolean;

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
     this.getFilms()
  }

  private getFilms(): void {
    this.filmService.getFilms()
      .pipe(
      take(1),
      concatMap((films) => {
        if (films.length > 0) {
          return of(films);
        }
        return this.filmService.loadFilms();
      })
      )
      .subscribe({
      next: (films) => {
        this.loading = true
      }
    });
  }
}
