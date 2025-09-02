import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordInputComponent } from 'src/app/shared/password-input/password-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordInputComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      password: [''], // sin validators acá: los maneja el PasswordInput
    });
  }

  public handleSubmit(): void {
    const { username, password } = this.form.value;

    if (!this.formValid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(username, password).subscribe({
      next: () => {
        this.passwordControl?.setErrors(null);
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err?.status === 401 || err?.status === 404) {
          const prev = this.passwordControl?.errors || {};
          this.passwordControl?.setErrors({
            ...prev,
            invalidCredentials: true,
          });
          this.passwordControl?.markAsTouched();
          this.passwordControl?.updateValueAndValidity({ onlySelf: true });
          return;
        }
        // TODO: mostrar modal para otros errores
      },
    });
  }

  get formValid(): boolean {
    return this.form.valid;
  }

  get usernameControl() {
    return this.form.get('username');
  }

  get passwordControl() {
    return this.form.get('password');
  }
}
