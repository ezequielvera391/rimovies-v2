import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ForgotPasswordComponent, ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Reset yout password"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Reset yout password'
    );
  });

  it('should have an invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should have a user input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-testid="email-input"]');
    expect(input).toBeTruthy();
  });

  it('should have a reset button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="reset-button"]');
    expect(button?.textContent).toContain('Continue');
  });

  it('should disable the login button if the form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="reset-button"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should be valid when form is filled correctly', () => {
    component.form.setValue({
      email: 'testuser@emial.com',
    });

    expect(component.form.valid).toBeTrue();
  });

  it('sholud enable the reset button if the form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '[data-testid="reset-button"]'
    ) as HTMLButtonElement;
    component.form.setValue({
      email: 'testuser@emial.com',
    });
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should have the correct routerLink for register', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="register-link"]');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe('/auth/register');
  });

});




























