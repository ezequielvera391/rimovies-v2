import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from '../app/shared/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MockNavBarComponent } from 'src/testing/mocks/mock-components';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let navbarLinks: { name: string; path: string }[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MockNavBarComponent],
      declarations: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: {
          imports: [NavBarComponent],
        },
        add: {
          imports: [MockNavBarComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    navbarLinks = component.navBarLinks = [
      { name: 'Home', path: '/' },
      { name: 'Films', path: '/films' },
    ];
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar component', () => {
    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );
    const navBarInstance = navBarDebugEl.componentInstance as MockNavBarComponent;
    expect(navBarInstance).toBeTruthy();
  })

  it('should bind the correct navBarLinks to app-nav-bar', () => {
    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );
    const navBarInstance = navBarDebugEl.componentInstance as MockNavBarComponent
    const expectedNavBarLinks = component.navBarLinks
    expect(navBarInstance.navLinks).toBe(expectedNavBarLinks);
  });

  it('should hide the navbar component if "showNavBar" is false', () => {
    component.showNavBar = false;
    fixture.detectChanges();

    const navBarDebugEl = fixture.debugElement.query(
      By.directive(MockNavBarComponent)
    );

    expect(navBarDebugEl).toBeNull();
  });

  it('should have a router-outlet', () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(outlet).toBeTruthy();
  });
});
