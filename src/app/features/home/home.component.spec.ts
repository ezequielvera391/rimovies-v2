import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmsService } from 'src/app/core/services/films.service';
import { of } from 'rxjs';
import { FilmCardComponent } from '../films/film-card/film-card.component';
import { By } from '@angular/platform-browser';
import { BackdropImageComponent } from 'src/app/shared/backdrop-image/backdrop-image.component';

@Component({
  selector: 'app-film-card',
  standalone: true,
  template: '',
})
class MockFilmCardComponent {
  @Input() data!: Film;
  @Input() id!: string;
}

@Component({
  selector: 'app-backdrop-image',
  standalone: true,
  template: '',
})
class MockBackdropImageComponent {
  @Input() imageUrl!: string;
}

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockFilmsService: jasmine.SpyObj<FilmsService>;

  beforeEach(async () => {
    mockFilmsService = jasmine.createSpyObj('FilmsService', [
      'loadRecommendedFilms',
    ]);
    mockFilmsService.loadRecommendedFilms.and.returnValue(
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
          rating: 3,
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
          rating: 3,
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
          poster_url: 'assets/images/temp/posters/mysterious-skin-poster.jpg',
          id: '2',
        },
      ])
    );
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    })
      .overrideComponent(HomeComponent, {
        remove: {
          imports: [FilmCardComponent, BackdropImageComponent],
        },
        add: {
          imports: [MockFilmCardComponent, MockBackdropImageComponent],
        },
      })
      .overrideProvider(FilmsService, { useValue: mockFilmsService })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRecommendedFilms() on init', () => {
    expect(mockFilmsService.loadRecommendedFilms).toHaveBeenCalled();
  });

  it('should display the title "Welcome back. Here\'s what we\'ve been watching"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      "Welcome back. Here's what we've been watching"
    );
  });

  it('should store recommended films in the component state', () => {
    expect(component.recommendedFilms.length).toBe(2);
    expect(component.recommendedFilms[0].title).toBe('Drive');
  })

  it('should render one film card per recommended film', () => {
    const filmCards = fixture.debugElement.queryAll(By.css('app-film-card'));
    expect(filmCards.length).toBe(component.recommendedFilms.length);
  });
  // TODO: should bind data and id to each FilmCardComponent correctly
  it('should bind film data to FilmCardComponent correctly', () => {
    const filmCardDebugEls = fixture.debugElement.queryAll(By.directive(MockFilmCardComponent));

    expect(filmCardDebugEls.length).toBe(2);

    const firstCard = filmCardDebugEls[0].componentInstance as MockFilmCardComponent;
    const secondCard = filmCardDebugEls[1].componentInstance as MockFilmCardComponent;

    expect(firstCard.data.title).toBe('Drive');
    expect(firstCard.id).toBe('1');

    expect(secondCard.data.title).toBe('Mysterious Skin');
    expect(secondCard.id).toBe('2');
  });

  it('should render the backdrop image component', () => {
    const backdropImage = fixture.debugElement.query(
      By.css('app-backdrop-image')
    );
    expect(backdropImage).toBeTruthy();
  });

  it('should bind the correct posterUrl to app-backdrop-image', () => {
    const backdropDebugEl = fixture.debugElement.query(
      By.directive(MockBackdropImageComponent)
    );
    const backdropComponentInstance =
      backdropDebugEl.componentInstance as MockBackdropImageComponent;
    const expectedPosterUrl = component.posterUrl;

    expect(backdropComponentInstance.imageUrl).toBe(expectedPosterUrl);
  });

});
