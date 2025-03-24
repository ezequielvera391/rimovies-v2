import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsService } from 'src/app/core/films.service';
import { Film } from 'src/app/core/interfaces/films.interface';
import { SearchInputComponent } from "../../shared/search-input/search-input.component";
import { FilmCardComponent } from './film-card/film-card.component';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, FilmCardComponent],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  public films: Film[] = [];
  public filteredFilms: Film[] = [];
  public searchKeys: string[] = ['title', 'director.name', 'actors.name'];
  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (res: Film[]) => {
        this.films = res;
        this.filteredFilms = this.films;
      },
    });
  }

  showFilteredFilms(filteredFilms: Film[]) {
    this.filteredFilms = filteredFilms;
  }
}
