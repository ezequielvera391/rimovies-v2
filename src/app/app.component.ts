import { Component, OnInit } from '@angular/core';
import { FilmsService } from './core/services/films.service';
import { concatMap, filter, of, take } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading: boolean;
  public navBarLinks = [
    { name: 'Home', path: '/' },
    { name: 'Films', path: '/films' },
  ];
  public showNavBar: boolean = true;
  private isProd: boolean;

  constructor(private filmService: FilmsService, private router: Router) {
    this.monitorNavBarVisibility();
  }

  ngOnInit(): void {
    this.getFilms();
    this.isProd = environment.production;
    this.configNavBar();
  }

  private configNavBar(): void {
    if (!this.isProd)
      this.navBarLinks.push({ name: 'playground', path: '/playground' });
  }

  private getFilms(): void {
    this.filmService
      .getFilms()
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
          this.loading = true;
        },
      });
  }

  private monitorNavBarVisibility(): void {
     this.router.events
      // NavigationEnd es una clase de Angular que representa un evento emitido cuando el Router termina una navegación exitosa.
       .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
       .subscribe((event: NavigationEnd) => {
         const hiddenRoutes = [
           '/auth',
           '/auth/login',
           '/auth/register',
           '/auth/forgot-password',
         ];
         this.showNavBar = !hiddenRoutes.some((path) =>
           event.urlAfterRedirects.startsWith(path)
         );
       });
  }
}
