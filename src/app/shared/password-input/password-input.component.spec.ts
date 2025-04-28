import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordInputComponent } from './password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render the label if provided', () => {
    component.label = 'Password';
    fixture.detectChanges();
    const label = compiled.querySelector('[data-testid="password-label"]');
    expect(label?.textContent).toBe('Password');
  });

  it('should not render the label if not provided', () => {
    component.label = undefined!;
    fixture.detectChanges();
    const label = compiled.querySelector('[data-testid="password-label"]');
    expect(label).toBeNull();
  });

  it('should bind input properties correctly', () => {
    component.placeholder = 'Enter your password';
    component.ariaLabel = 'Password field';
    component.value = 'mypassword';
    fixture.detectChanges();

    const input = compiled.querySelector(
      '[data-testid="password-input"]'
    ) as HTMLInputElement;

    expect(input.type).toBe('password');
    expect(input.placeholder).toBe('Enter your password');
    expect(input.getAttribute('aria-label')).toBe('Password field');
    expect(input.title).toBe('password');
    expect(input.value).toBe('mypassword');
  });

  it('should handle input events and call onChange and onTouched', () => {
    const input = compiled.querySelector(
      '[data-testid="password-input"]'
    ) as HTMLInputElement;
    const testValue = 'newPassword';

    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    input.value = testValue;
    input.dispatchEvent(new Event('input'));

    expect(component.value).toBe(testValue);
    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should render the toggle password visibility button', () => {
    const toggleButton = compiled.querySelector(
      '[data-testid="toggle-button"]'
    );
    expect(toggleButton).toBeTruthy();
  });

  it('should toggle password visibility on button click', () => {
    const toggleButton = compiled.querySelector(
      '[data-testid="toggle-button"]'
    ) as HTMLElement;
    const input = compiled.querySelector(
      '[data-testid="password-input"]'
    ) as HTMLInputElement;

    expect(component.showPassword).toBeFalse();
    expect(input.type).toBe('password');

    toggleButton.click();
    fixture.detectChanges();

    expect(component.showPassword).toBeTrue();
    expect(input.type).toBe('text');

    toggleButton.click();
    fixture.detectChanges();

    expect(component.showPassword).toBeFalse();
    expect(input.type).toBe('password');
  });

  it('should update the icon correctly when toggling password visibility', () => {
    const toggleIcon = compiled.querySelector(
      '[data-testid="toggle-icon"]'
    ) as HTMLImageElement;

    expect(toggleIcon.src).toContain('visibility_off.svg');

    component.togglePasswordVisibility();
    fixture.detectChanges();

    expect(toggleIcon.src).toContain('visibility_on.svg');
  });

  it('should write value correctly using writeValue method', () => {
    component.writeValue('newPassword');
    fixture.detectChanges();

    expect(component.value).toBe('newPassword');

    const input = compiled.querySelector(
      '[data-testid="password-input"]'
    ) as HTMLInputElement;
    expect(input.value).toBe('newPassword');
  });
});
