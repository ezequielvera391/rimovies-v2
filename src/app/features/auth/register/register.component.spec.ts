import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegisterComponent, ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Create an account"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Create an account'
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

  it('should have a password2 input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-testid="password2-input"]');
    expect(input).toBeTruthy();
  });

  it('should have a Sign up button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="register-button"]');
    expect(button?.textContent).toContain('Sign up');
  });

  it('should disable the Sign up button if the form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="register-button"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should be valid when form is filled correctly', () => {
    component.form.setValue({
      username: 'testuser',
      password: 'testpass',
      password2: 'testpass'
    });

    expect(component.form.valid).toBeTrue();
  });

  it('sholud enable the Sign up button if the form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="register-button"]'
    ) as HTMLButtonElement;
    component.form.setValue({
      username: 'testuser',
      password: 'testpass',
      password2: 'testpass',
    });
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should have the correct routerLink for login', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="login-link"]');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe('/auth/login');
  });

  it('should set passwordMismatch error if passwords do not match', () => {
    component.form.setValue({
      username: 'testuser',
      password: 'testpass1',
      password2: 'testpass2',
    });

    fixture.detectChanges();
    expect(component.form.valid).toBeFalse();
    expect(component.form.hasError('passwordMismatch')).toBeTrue();
  });

  it('should call handleSubmit when the form is valid and the form is submitted', () => {
    const spy = spyOn(component, 'handleSubmit');
    component.form.setValue({
      username: 'user',
      password: '123456',
      password2: '123456',
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '[data-testid="register-button"]'
    ) as HTMLButtonElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not submit when form is invalid', () => {
    spyOn(component, 'handleSubmit');
    component.form.setValue({
      username: 'user',
      password: '123456',
      password2: '654321',
    });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      '[data-testid="register-button"]'
    );
    button.click();

    expect(component.handleSubmit).not.toHaveBeenCalled();
  });
});
