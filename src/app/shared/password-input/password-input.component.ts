import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  public value = '';
  public showPassword: boolean = false;
  public imgIcon: string;

  @Input() placeholder: string = 'Password';
  @Input() label: string;
  @Input() ariaLabel: string = 'Password';

  ngOnInit(): void {
    this.imgIcon = 'assets/images/icons/visibility_off.svg';
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.imgIcon = 'assets/images/icons/visibility_on.svg')
      : (this.imgIcon = 'assets/images/icons/visibility_off.svg');
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }
}
