import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from "../../../shared/password-input/password-input.component";
import { RouterModule } from '@angular/router';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get formValid(): boolean {
    return this.form.valid
  }
}
