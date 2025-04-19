import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailsComponent } from './film-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCardComponent } from 'src/app/shared/card/base-card.component';
import { MockBackdropImageComponent, MockBaseCardComponent, MockChipComponent, MockDividerComponent } from 'src/testing/mocks/mock-components';
import { mockFilm, mockFilms } from 'src/testing/mocks/mock-films';
import { ChipComponent } from 'src/app/shared/chip/chip.component';
import { BackdropImageComponent } from 'src/app/shared/backdrop-image/backdrop-image.component';
import { DividerComponent } from 'src/app/shared/divider/divider.component';
import { mockActivatedRouteWithParams, mockRouterWithState } from 'src/testing/test-utils';
import { FilmsService } from 'src/app/core/services/films.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

fdescribe('FilmDetailsComponent', () => {
  let component: FilmDetailsComponent;
  let fixture: ComponentFixture<FilmDetailsComponent>;
  let mockFilmsService: jasmine.SpyObj<FilmsService>;

  beforeEach(async () => {
    mockFilmsService = jasmine.createSpyObj('FilmsService', [
      'loadRecommendedFilms',
    ]);
    mockFilmsService.loadRecommendedFilms.and.returnValue(of(mockFilms)); // default value
    await TestBed.configureTestingModule({
      imports: [FilmDetailsComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouterWithState({ filmData: mockFilm }),
        }, // !This approach will change when calling backend services is implemented.
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRouteWithParams({ id: '1' }),
        },
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    })
      .overrideComponent(FilmDetailsComponent, {
        remove: {
          imports: [
            BaseCardComponent,
            ChipComponent,
            BackdropImageComponent,
            DividerComponent,
          ],
        },
        add: {
          imports: [
            MockBaseCardComponent,
            MockChipComponent,
            MockBackdropImageComponent,
            MockDividerComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FilmDetailsComponent);
    component = fixture.componentInstance;
    component.data = mockFilm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // film details section

  it('should redirect to / if film data is missing in router state', async () => {
    TestBed.resetTestingModule();
    const mockRouter = mockRouterWithState({});

    await TestBed.configureTestingModule({
      imports: [FilmDetailsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRouteWithParams({ id: '1' }),
        },
        {
          provide: FilmsService,
          useValue: jasmine.createSpyObj('FilmsService', {
            loadRecommendedFilms: of(mockFilms),
          }),
        },
      ],
    })
      .overrideComponent(FilmDetailsComponent, {
        remove: {
          imports: [
            BaseCardComponent,
            ChipComponent,
            BackdropImageComponent,
            DividerComponent,
          ],
        },
        add: {
          imports: [
            MockBaseCardComponent,
            MockChipComponent,
            MockBackdropImageComponent,
            MockDividerComponent,
          ],
        },
      })
      .compileComponents();

    const fixture = TestBed.createComponent(FilmDetailsComponent);
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set data property from navigation state', () => {
    mockFilmsService.loadRecommendedFilms.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();
    expect(mockFilmsService.loadRecommendedFilms).toHaveBeenCalled();
    expect(component.recommendedFilms).toEqual([]);
  });

  it('should render the title and year in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filmTitle = compiled.querySelector('[data-testid="film-title"]');
    const filmYear = compiled.querySelector('[data-testid="film-year"]');

    expect(filmTitle).toBeTruthy();
    expect(filmYear).toBeTruthy();
  });

  it('should render the synopsis in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const filmSynopsis = compiled.querySelector('[data-testid="film-synopsis"]');
    expect(filmSynopsis).toBeTruthy();
  })

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
    const backdropComponentInstance = backdropDebugEl.componentInstance as MockBackdropImageComponent;
    const expectedPosterUrl = component.data.poster_url;

    expect(backdropComponentInstance.imageUrl).toBe(expectedPosterUrl);
  });

  it('should render the base card component', () => {
    const backdropImage = fixture.debugElement.query(
      By.css('app-base-card')
    );
    expect(backdropImage).toBeTruthy();
  });

  it('should render the base card with the correct cover and size', () => {
    const baseCardDebugEl = fixture.debugElement.queryAll(
      By.directive(MockBaseCardComponent)
    );
    const baseCardComponentInstance = baseCardDebugEl[0].componentInstance as MockBaseCardComponent;
    const expectedSize = component.size;
    const expectedCover = component.data.cover;

    expect(baseCardComponentInstance.size).toBe(expectedSize);
    expect(baseCardComponentInstance.imageUrl).toBe(expectedCover)
  });

  it('should display a button with text "Add to Watchlist" and icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const buttonAdd = compiled.querySelector(
      '[data-testid="button-add-to-wtchlist"]'
    );
    const img = buttonAdd?.querySelector('img') as HTMLImageElement;
    const text = buttonAdd?.querySelector('span') as HTMLSpanElement;
    expect(text.textContent?.trim()).toBe('Add to Watchlist');
    expect(img).toBeTruthy();
    expect(buttonAdd).toBeTruthy();
  });

  it('should render one app-chip for the director with the correct label', () => {
    const directorSection = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="director-section"]'
    );
    const chipDebugEls = fixture.debugElement.queryAll(
      By.directive(MockChipComponent)
    );

    const directorChip = chipDebugEls.find((chip) =>
      directorSection.contains(chip.nativeElement)
    );

    expect(directorChip).toBeTruthy();
    expect(directorChip?.componentInstance.label).toBe(
      component.data.director.name
    );
  });

  it('should render one app-chip for each actor with the correct label', () => {
    const actorsSection = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="actors-section"]'
    );
    const chipDebugEls = fixture.debugElement.queryAll(
      By.directive(MockChipComponent)
    );

    const actorChips = chipDebugEls.filter((chip) =>
      actorsSection.contains(chip.nativeElement)
    );

    const expectedActorNames = component.data.actors.map((actor) => actor.name);
    const renderedLabels = actorChips.map(
      (chip) => chip.componentInstance.label
    );

    expect(actorChips.length).toBe(expectedActorNames.length);
    expect(renderedLabels).toEqual(jasmine.arrayContaining(expectedActorNames));
  });

  it('should render one app-chip for the gender when data.gender.name is present', () => {
    const genderSection = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="gender-section"]'
    );
    const chipDebugEls = fixture.debugElement.queryAll(
      By.directive(MockChipComponent)
    );

    const genderChip = chipDebugEls.find((chip) =>
      genderSection.contains(chip.nativeElement)
    );

    expect(genderChip).toBeTruthy();
    expect(genderChip?.componentInstance.label).toBe(
      component.data.gender.name
    );
  });

  it('should not render the gender chip if data.gender.name is falsy', () => {
    component.data = {
      ...component.data,
      gender: {
        ...component.data.gender,
        name: '',
      },
    };
    fixture.detectChanges();

    const genderSection = fixture.nativeElement.querySelector(
      '[data-testid="gender-section"]'
    );
    fixture.detectChanges();
    expect(genderSection).toBeNull();
  });


  // RECOMMENDED FILMS
  it('should call loadRecommendedFilms and handle empty array', async () => {
    mockFilmsService.loadRecommendedFilms.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();
    expect(mockFilmsService.loadRecommendedFilms).toHaveBeenCalled();
    expect(component.recommendedFilms).toEqual([]);
  });

  it('should call loadRecommendedFilms and handle empty array', async () => {
    mockFilmsService.loadRecommendedFilms.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();
    expect(mockFilmsService.loadRecommendedFilms).toHaveBeenCalled();
    expect(component.recommendedFilms).toEqual([]);
  });

  it('should render one recommended card per film', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '[data-testid="recommended-film-card"]'
    );

    expect(cards.length).toBe(component.recommendedFilms.length);
  });

  it('should bind imageUrl, size, and goToUrl correctly on recommended film cards', () => {
    const baseCards = fixture.debugElement.queryAll(
      By.directive(MockBaseCardComponent)
    );

    const recommendedCards = baseCards.filter(
      (card) => card.componentInstance.size === 'x-small'
    );

    recommendedCards.forEach((cardDebugEl, index) => {
      const instance = cardDebugEl.componentInstance as MockBaseCardComponent;
      const film = component.recommendedFilms[index];

      expect(instance.imageUrl).toBe(film.cover);
      expect(instance.size).toBe('x-small');
      expect(instance.goToUrl).toBe(`films/${film.id}`);
    });
  });


  it('should render one divider per recommended film', () => {
    const dividers = fixture.nativeElement.querySelectorAll(
      '[data-testid="recommended-divider"]'
    );

    expect(dividers.length).toBe(component.recommendedFilms.length);
  });

});
