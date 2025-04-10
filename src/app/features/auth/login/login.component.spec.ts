import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara el render del HTML
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Welcome back!"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Welcome back!'
    );
  });

  it('should have an invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should have a user input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-testid="username-input"]');
    expect(input).toBeTruthy();
  });

  it('should have a password input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-testid="password-input"]');
    expect(input).toBeTruthy();
  });

  it('should have a login button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="login-button"]');
    expect(button?.textContent).toContain('Login');
  });

  it('should disable the login button if the form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="login-button"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should be valid when form is filled correctly', () => {
    component.form.setValue({
      username: 'testuser',
      password: 'testpass',
    });

    expect(component.form.valid).toBeTrue();
  });

  it('sholud enable the login button if the form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="login-button"]'
    ) as HTMLButtonElement;
    component.form.setValue({
      username: 'testuser',
      password: 'testpass',
    });
    expect(button.disabled).toBeTrue();
  });

  it('should have the correct routerLink for register', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="register-link"]');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe('/auth/register');
  });

  it('should have a link to the reset password', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="reset-link"]');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe(
      '/auth/forgot-password'
    );
  });

  // TODO: test submit behavior once implemented
  xit('should handle form submission when valid', () => {
    // To be implemented when submit logic is ready
  });
});
