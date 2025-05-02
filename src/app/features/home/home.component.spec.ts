import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';
import { Film } from 'src/app/core/interfaces/films.interface';
import { FilmsService } from 'src/app/core/services/films.service';
import { of } from 'rxjs';
import { FilmCardComponent } from '../films/film-card/film-card.component';
import { By } from '@angular/platform-browser';
import { BackdropImageComponent } from 'src/app/shared/backdrop-image/backdrop-image.component';
import { MockBackdropImageComponent, MockFilmCardComponent } from 'src/testing/mocks/mock-components';
import { mockFilms } from 'src/testing/mocks/mock-films';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockFilmsService: jasmine.SpyObj<FilmsService>;

  beforeEach(async () => {
    mockFilmsService = jasmine.createSpyObj('FilmsService', [
      'loadRecommendedFilms',
    ]);
    mockFilmsService.loadRecommendedFilms.and.returnValue(of(mockFilms));
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

  it('should execute ngOnInit()', () => {
  const spy = spyOn(component as any, 'getRecommendedFilms').and.callThrough();
  component.ngOnInit();
  expect(spy).toHaveBeenCalled();
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

  it('should rotate the poster image correctly', () => {
    component.recommendedFilms = mockFilms;
    component.posterUrl = mockFilms[0].poster_url;

    component['rotatePoster']();

    expect(component.posterUrl).toBe(mockFilms[1].poster_url);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = spyOn(
      (component as any).destroy$,
      'next'
    ).and.callThrough();
    const completeSpy = spyOn(
      (component as any).destroy$,
      'complete'
    ).and.callThrough();

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should rotate poster on timer emission (rxjs concatMap branch)', fakeAsync(() => {
    mockFilmsService.loadRecommendedFilms.and.returnValue(of(mockFilms));

    component.ngOnInit();
    tick(0);
    expect(component.posterUrl).toBe(mockFilms[1].poster_url);

    discardPeriodicTasks();
  }));
});
