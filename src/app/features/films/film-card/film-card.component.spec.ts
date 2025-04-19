import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmCardComponent } from './film-card.component';
import { Film } from 'src/app/core/interfaces/films.interface';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaseCardComponent } from 'src/app/shared/card/base-card.component';
import { MockBaseCardComponent } from 'src/testing/mocks/mock-components';
import { mockFilm } from 'src/testing/mocks/mock-films';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCardComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        }, // !This approach will change when calling backend services is implemented.
      ],
    })
      .overrideComponent(FilmCardComponent, {
        remove: {
          imports: [BaseCardComponent],
        },
        add: {
          imports: [MockBaseCardComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.data = mockFilm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a detail button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="detail-button"]');
    expect(button).toBeTruthy();
    const img = button?.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
  });

  it('should have a fav button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="fav-button"]');
    expect(button).toBeTruthy();
    const img = button?.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
  });

  it('should generate goToUrl based on data.id', () => {
    expect(component.goToUrl).toBe('films/1');
  });

  it('should call navigateTo with Router.navigate when clicking detail button', () => {
    const router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;

    const detailBtn = compiled.querySelector(
      '[data-testid="detail-button"]'
    ) as HTMLButtonElement;
    detailBtn.click();

    expect(router.navigate).toHaveBeenCalledWith(['films/', mockFilm.id], {
      state: { filmData: mockFilm },
    });
  });

  it('should call navigateTo() and stop event propagation', () => {
    const event = jasmine.createSpyObj('event', ['stopPropagation']);
    component.data = mockFilm;

    component.navigateTo(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
      ['films/', mockFilm.id],
      {
        state: { filmData: mockFilm },
      }
    );
  });

  it('should trigger navigateTo when clicking the detail button', () => {
    spyOn(component, 'navigateTo');

    const detailButton = fixture.nativeElement.querySelector(
      '[data-testid="detail-button"]'
    ) as HTMLButtonElement;
    detailButton.click();

    expect(component.navigateTo).toHaveBeenCalled();
  });

  it('should call addToFavorites() and stop event propagation', () => {
    const event = jasmine.createSpyObj('event', ['stopPropagation']);
    component.addToFavorites(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should trigger addToFavorites when clicking the favorite button', () => {
    spyOn(component, 'addToFavorites');

    const favButton = fixture.nativeElement.querySelector(
      '[data-testid="fav-button"]'
    ) as HTMLButtonElement;
    favButton.click();

    expect(component.addToFavorites).toHaveBeenCalled();
  });

  it('should have "medium" as the default size', () => {
    component.data = mockFilm;
    fixture.detectChanges();

    expect(component.size).toBe('medium');
  });

  it('should accept a custom size input', () => {
    component.data = mockFilm;
    component.size = 'large';
    fixture.detectChanges();

    expect(component.size).toBe('large');
  });

  it('should pass the size input to BaseCardComponent', () => {
    component.data = mockFilm;
    component.size = 'x-small';
    fixture.detectChanges();

    const baseCardDebug = fixture.debugElement.query(
      By.directive(MockBaseCardComponent)
    );
    expect(baseCardDebug).toBeTruthy();

    const baseCardInstance = baseCardDebug!.componentInstance as MockBaseCardComponent;
    expect(baseCardInstance.size).toBe('x-small');
  });

});
