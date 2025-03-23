import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Film } from './interfaces/films.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private films$ = new BehaviorSubject<Film[]>([]);
  private recommendedFilms$ = new BehaviorSubject<Film[]>([]);
  private url = 'assets/mocks/movies.json'; // TODO: traer de una variable de entorno

  constructor(private http: HttpClient) {}

  loadFilms(): Observable<Film[]> {
    return this.http
      .get<Film[]>(this.url)
      .pipe(tap((films) => this.films$.next(films)));
  }

  // TODO: implementar servicio que traiga recomendaciones en función a lo último visto
  loadRecommendedFilms(): Observable<Film[]> {
    return this.http
      .get<Film[]>('assets/mocks/recommendedMovies.json')
      .pipe(tap((films) => this.recommendedFilms$.next(films)));
  }

  getFilms(): Observable<Film[]> {
    return this.films$.asObservable();
  }

  getRecommendedFilms(): Observable<Film[]> {
    return this.recommendedFilms$.asObservable();
  }
}
