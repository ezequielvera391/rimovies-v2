import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Something went wrong'
    );
    expect(compiled.querySelector('p')?.textContent).toContain(
      'we couldn’t find the page'
    );
  });

  it('should show the "Go Home" button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Go Home');
  });

  it('should display the error image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img?.getAttribute('src')).toBe('assets/images/404-error.png');
    expect(img?.getAttribute('alt')).toBe('404');
  });

  it('should call redirectToHome() when the button is clicked', () => {
    const spy = spyOn(component, 'redirectToHome');
    const button = fixture.nativeElement.querySelector('button');

    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to home when redirectToHome() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
