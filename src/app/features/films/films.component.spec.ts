import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmCardComponent } from './film-card/film-card.component';
import { SearchInputComponent } from 'src/app/shared/search-input/search-input.component';
import { FilmsService } from 'src/app/core/services/films.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { mockFilms } from 'src/testing/mocks/mock-films';
import { MockFilmCardComponent, MockSearchInputComponent } from 'src/testing/mocks/mock-components';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getFilms: () =>
              of(mockFilms),
          },
        },
      ],
    })
    .overrideComponent(FilmsComponent, {
      remove: {
        imports: [FilmCardComponent, SearchInputComponent],
      },
      add: {
        imports: [MockFilmCardComponent, MockSearchInputComponent],
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films from service on init', () => {
    expect(component.films.length).toBe(2);
    expect(component.filteredFilms.length).toBe(2);
    expect(component.films[0].title).toBe('Drive');
    expect(component.filteredFilms[1].title).toBe('Mysterious Skin');
  });

  it('should render one card per film in filteredFilms', () => {
    const filmCards = fixture.debugElement.queryAll(By.css('app-film-card'));
    expect(filmCards.length).toBe(component.filteredFilms.length);
  });

  it('should bind film data to FilmCardComponent correctly', () => {
    const filmCardDebugEls = fixture.debugElement.queryAll(
      By.directive(MockFilmCardComponent)
    );
    expect(filmCardDebugEls.length).toBe(2);

    const firstCardInstance = filmCardDebugEls[0].componentInstance;
    expect(firstCardInstance.data.title).toBe('Drive');

    const secondCardInstance = filmCardDebugEls[1].componentInstance;
    expect(secondCardInstance.data.title).toBe('Mysterious Skin');
  });

  it('should update filteredFilms on showFilteredFilms()', () => {
    const mockFilteredList: Film[] = [
      {
        ...component.films[0],
        id: '10',
        title: 'Only One',
      },
    ];

    component.showFilteredFilms(mockFilteredList);
    fixture.detectChanges();

    expect(component.filteredFilms.length).toBe(1);
    expect(component.filteredFilms[0].title).toBe('Only One');

    const filmCards = fixture.debugElement.queryAll(By.css('app-film-card'));
    expect(filmCards.length).toBe(1);
  });

  it('should listen to emitSearch and update filteredFilms', () => {
    const filteredMock: Film[] = [
      {
        ...component.films[0],
        id: '99',
        title: 'Filtered Movie',
      },
    ];

    const searchInputDE = fixture.debugElement.query(
      By.directive(MockSearchInputComponent)
    );
    const searchInputInstance = searchInputDE.componentInstance as MockSearchInputComponent;
    searchInputInstance.emitSearch.emit(filteredMock);
    fixture.detectChanges();

    expect(component.filteredFilms.length).toBe(1);
    expect(component.filteredFilms[0].title).toBe('Filtered Movie');

    const filmCards = fixture.debugElement.queryAll(By.css('app-film-card'));
    expect(filmCards.length).toBe(1);
  });

  it('should bind film data to FilmCardComponent correctly', () => {
    const filmCardDebugEls = fixture.debugElement.queryAll(
      By.directive(MockFilmCardComponent)
    );

    expect(filmCardDebugEls.length).toBe(2);

    const firstCard = filmCardDebugEls[0]
      .componentInstance as MockFilmCardComponent;
    const secondCard = filmCardDebugEls[1]
      .componentInstance as MockFilmCardComponent;

    expect(firstCard.data.title).toBe('Drive');
    expect(firstCard.id).toBe('1');

    expect(secondCard.data.title).toBe('Mysterious Skin');
    expect(secondCard.id).toBe('2');
  });
});
