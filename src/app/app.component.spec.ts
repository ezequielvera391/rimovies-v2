import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from '../app/shared/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MockNavBarComponent } from 'src/testing/mocks/mock-components';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { of, Subject } from 'rxjs';
import { FilmsService } from './core/services/films.service';
import { mockFilm, mockFilms } from 'src/testing/mocks/mock-films';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerEvents$: Subject<any>;
  let router: Router;
  let filmService: FilmsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MockNavBarComponent],
      declarations: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [NavBarComponent] },
        add: { imports: [MockNavBarComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    filmService = TestBed.inject(FilmsService);
    routerEvents$ = new Subject<any>();

    Object.defineProperty(router, 'events', {
      get: () => routerEvents$.asObservable(),
    });

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar component', () => {
    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );
    expect(navBarDebugEl).toBeTruthy();
  });

  it('should bind the correct navBarLinks to app-nav-bar', () => {
    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );
    const navBarInstance =
      navBarDebugEl.componentInstance as MockNavBarComponent;
    expect(navBarInstance.navLinks).toEqual(component.navBarLinks);
  });

  it('should hide the navbar component if "showNavBar" is false', () => {
    component.showNavBar = false;
    fixture.detectChanges();
    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );
    expect(navBarDebugEl).toBeNull();
  });

  it('should add playground link in dev mode', () => {
    component['isProd'] = false as any;
    component['configNavBar']();
    expect(
      component.navBarLinks.some((link) => link.name === 'playground')
    ).toBeTrue();
  });

  it('should have a router-outlet', () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(outlet).toBeTruthy();
  });

  it('should not call loadFilms if films already exist', () => {
    spyOn(filmService, 'getFilms').and.returnValue(of(mockFilms));
    const loadFilmsSpy = spyOn(filmService, 'loadFilms');

    component['getFilms']();

    expect(loadFilmsSpy).not.toHaveBeenCalled();
    expect(component.loading).toBeTrue();
  });

  it('should call loadFilms if no films exist', () => {
    spyOn(filmService, 'getFilms').and.returnValue(of([]));
    const loadFilmsSpy = spyOn(filmService, 'loadFilms').and.returnValue(
      of([mockFilm])
    );

    component['getFilms']();

    expect(loadFilmsSpy).toHaveBeenCalled();
    expect(component.loading).toBeTrue();
  });

  it('should hide navbar on auth route', () => {
    component['monitorNavBarVisibility']();
    routerEvents$.next(new NavigationEnd(1, '/auth/login', '/auth/login'));
    expect(component.showNavBar).toBeFalse();
  });

  it('should show navbar on non-auth route', () => {
    component['monitorNavBarVisibility']();
    routerEvents$.next(new NavigationEnd(1, '/films', '/films'));
    expect(component.showNavBar).toBeTrue();
  });
});
