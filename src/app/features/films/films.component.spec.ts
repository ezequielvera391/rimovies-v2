import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmCardComponent } from './film-card/film-card.component';
import { SearchInputComponent } from 'src/app/shared/search-input/search-input.component';
import { FilmsService } from 'src/app/core/services/films.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-search-input',
  standalone: true,
  template: '',
})
class MockSearchInputComponent {
  @Input() placeholder!: string;
  @Input() data!: Film[];
  @Input() keys!: string[];
  @Output() emitSearch = new EventEmitter<Film[]>();
}

@Component({
  selector: 'app-film-card',
  standalone: true,
  template: '',
})
class MockFilmCardComponent {
  @Input() data!: Film;
  @Input() id!: string;
}

fdescribe('FilmsComponent', () => {
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
              of([
                {
                  title: 'Drive',
                  sinopsis:
                    'A prototype enhanced human, on the run from Chinese-hired hit men, hooks up with a dread-locked bystander, and the two of them elude their pursuers narrowly each time.',
                  year: 1997,
                  director: {
                    id: '6423910681835624258',
                    name: 'Mark Dacascos',
                  },
                  genero: {
                    id: '5673693341140147561',
                    name: 'genero default',
                  },
                  cover: 'assets/images/temp/cards/drive-cover.jpg',
                  was_watched: false,
                  rating: null,
                  actors: [
                    {
                      id: '6423910681835624258',
                      name: 'Mark Dacascos',
                    },
                    {
                      id: '12671016886590266669',
                      name: 'Kadeem Hardison',
                    },
                    {
                      id: '12039611290891670486',
                      name: 'John Pyper-Ferguson',
                    },
                    {
                      id: '13184388871992858153',
                      name: 'Brittany Murphy',
                    },
                    {
                      id: '11256182331831376635',
                      name: 'Tracey Walter',
                    },
                  ],
                  poster_url: 'assets/images/temp/posters/drive-poster.jpg',
                  id: '1',
                },
                {
                  title: 'Mysterious Skin',
                  sinopsis:
                    'A teenage hustler and a young man obsessed with alien abductions cross paths, together discovering a horrible, liberating truth.',
                  year: 2004,
                  director: {
                    id: '3339416782209307937',
                    name: 'Joseph Gordon-Levitt',
                  },
                  genero: {
                    id: '5673693341140147561',
                    name: 'genero default',
                  },
                  cover: 'assets/images/temp/cards/mysterious-skin-cover.jpg',
                  was_watched: false,
                  rating: null,
                  actors: [
                    {
                      id: '3339416782209307937',
                      name: 'Joseph Gordon-Levitt',
                    },
                    {
                      id: '1563081563033525666',
                      name: 'Brady Corbet',
                    },
                    {
                      id: '9132177978273651793',
                      name: 'Michelle Trachtenberg',
                    },
                    {
                      id: '10283611075315261231',
                      name: 'Jeffrey Licon',
                    },
                    {
                      id: '1921744841046446910',
                      name: 'Mary Lynn Rajskub',
                    },
                  ],
                  poster_url:
                    'assets/images/temp/posters/mysterious-skin-poster.jpg',
                  id: '2',
                },
            ]),
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
