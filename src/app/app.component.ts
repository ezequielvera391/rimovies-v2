import { Component, OnInit } from '@angular/core';
import { FilmsService } from './core/films.service';
import { concatMap, of, take } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading: boolean;
  public navBarLinks = [{name: 'Home', path: '/'}, {name: 'Films', path: '/films'}]
  private isProd:boolean;

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.getFilms()
    this.isProd = environment.production
    this.configNavBar()
  }

  private configNavBar():void {
    if (!this.isProd) this.navBarLinks.push({name: 'playground', path: '/playground'})
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
      next: () => {
        this.loading = true
      }
    });
  }
}
