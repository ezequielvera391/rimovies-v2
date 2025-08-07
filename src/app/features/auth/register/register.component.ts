import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from 'src/app/shared/password-input/password-input.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchFieldsValidator } from 'src/app/core/utils/validators-custom.utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    PasswordInputComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    },
    { validators: matchFieldsValidator('password', 'password2', 'passwordMismatch') });
  }

  public handleSubmit(): void {
    if (this.form.invalid) return;
    const { username, password, email, password2 } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      },
    });
  }

  get formValid(): boolean {
    return this.form.valid;
  }
}

