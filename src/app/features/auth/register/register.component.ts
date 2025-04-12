import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from 'src/app/shared/password-input/password-input.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchFieldsValidator } from 'src/app/core/utils/validators-custom.utils';

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

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    },
    { validators: matchFieldsValidator('password', 'password2', 'passwordMismatch') });
  }

  public handleSubmit(): void {
    if (this.form.invalid) return;
    const { username, password, password2 } = this.form.value;
    console.log({ username, password, password2 });
  }

  get formValid(): boolean {
    return this.form.valid;
  }
}

