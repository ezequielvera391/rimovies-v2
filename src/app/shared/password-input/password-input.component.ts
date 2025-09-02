import { Component, forwardRef, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor, Validator {
  private static nextId = 0;
  public readonly errorId: string;

  public value = '';
  public showPassword: boolean = false;
  public imgIcon: string;

  // confirmación opcional para registro
  @Input() confirm = false;
  public confirmValue = '';
  public showConfirm = false;

  @Input() placeholder: string = 'Password';
  @Input() label: string;
  @Input() ariaLabel: string = 'Password';

  @Input() required = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string;
  @Input() messages: Partial<
    Record<
      | 'required'
      | 'minlength'
      | 'maxlength'
      | 'pattern'
      | 'mismatch'
      | 'invalidCredentials',
      string
    >
  > = {
    required: 'Password is required.',
    minlength: 'Password is too short.',
    maxlength: 'Password is too long.',
    pattern: 'Password does not meet requirements.',
    mismatch: 'Passwords do not match.',
    invalidCredentials: 'Invalid username or password.',
  };

  private onChange = (_: any) => {};
  private onTouched = () => {};
  private lastErrors: ValidationErrors | null = null;
  public touched = false;
  public touchedConfirm = false;

  private controlRef?: AbstractControl;

  constructor() {
    this.errorId = `password-error-${PasswordInputComponent.nextId++}`;
  }
  ngOnInit(): void {
    this.imgIcon = 'assets/images/icons/visibility_off.svg';
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.imgIcon = this.showPassword
      ? 'assets/images/icons/visibility_on.svg'
      : 'assets/images/icons/visibility_off.svg';
  }

  public toggleConfirmVisibility(): void {
    this.showConfirm = !this.showConfirm;
  }

  public writeValue(value: string): void {
    this.value = value ?? '';
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

    // limpiar invalidCredentials si estaba seteado por el padre
    if (this.controlRef?.hasError?.('invalidCredentials')) {
      const { invalidCredentials, ...rest } = this.controlRef.errors || {};
      this.controlRef.setErrors(Object.keys(rest).length ? rest : null);
    }

    // revalidar para reflejar min/max/pattern/mismatch
    this.controlRef?.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false,
    });
  }

  public onInputConfirm(event: Event): void {
    this.confirmValue = (event.target as HTMLInputElement).value ?? '';
    this.controlRef?.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false,
    });
  }

  public handleBlur(): void {
    this.touched = true;
    this.onTouched();
  }
  public handleBlurConfirm(): void {
    this.touchedConfirm = true;
    this.onTouched();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    // guardamos referencia al control host para usarla en onInput/onInputConfirm
    this.controlRef = control;

    const v = (this.value ?? '').toString();
    const errs: ValidationErrors = {};

    if (this.required && v.length === 0) {
      errs['required'] = true;
    }
    if (
      typeof this.minLength === 'number' &&
      v.length > 0 &&
      v.length < this.minLength
    ) {
      errs['minlength'] = {
        requiredLength: this.minLength,
        actualLength: v.length,
      };
    }
    if (typeof this.maxLength === 'number' && v.length > this.maxLength) {
      errs['maxlength'] = {
        requiredLength: this.maxLength,
        actualLength: v.length,
      };
    }
    if (this.pattern) {
      const re = new RegExp(this.pattern);
      if (!re.test(v)) {
        errs['pattern'] = true;
      }
    }

    if (this.confirm) {
      const anyTyped = v.length > 0 || this.confirmValue.length > 0;
      if (anyTyped && v !== this.confirmValue) {
        errs['mismatch'] = true;
      }
      if (this.required && this.confirmValue.length === 0) {
        errs['required'] = true;
      }
    }

    this.lastErrors = Object.keys(errs).length ? errs : null;
    return this.lastErrors;
  }

  // ---- helpers de errores ----
  private get externalErrors(): ValidationErrors | null {
    return this.controlRef?.errors ?? null;
  }

  public get hasError(): boolean {
    const touched = this.confirm
      ? this.touched || this.touchedConfirm
      : this.touched;
    return (
      touched &&
      (!!this.lastErrors || !!this.externalErrors?.['invalidCredentials'])
    );
  }

  public get currentErrorMessage(): string {
    // Priorizar error de backend (invalidCredentials) si está presente
    if (this.externalErrors?.['invalidCredentials']) {
      return (
        this.messages.invalidCredentials ?? 'Invalid username or password.'
      );
    }

    if (!this.lastErrors) return '';
    if (this.lastErrors['required'])
      return this.messages.required ?? 'Password is required.';
    if (this.lastErrors['minlength']) {
      const req = this.lastErrors['minlength'].requiredLength;
      return (
        this.messages.minlength ??
        `Password must be at least ${req} characters.`
      );
    }
    if (this.lastErrors['maxlength']) {
      const req = this.lastErrors['maxlength'].requiredLength;
      return (
        this.messages.maxlength ?? `Password must be at most ${req} characters.`
      );
    }
    if (this.lastErrors['pattern'])
      return this.messages.pattern ?? 'Password does not meet requirements.';
    if (this.lastErrors['mismatch'])
      return this.messages.mismatch ?? 'Passwords do not match.';
    return '';
  }
}
