import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from "../../../shared/password-input/password-input.component";
import { RouterModule } from '@angular/router';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm()
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res)=> {
      console.log(res)
    })
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public handleSubmit(): void {
    const { username, password } = this.form.value;
    console.log({ username, password });
    this.authService.login(username, password).subscribe({
      next: (res) => {
        // TODO: redireccionar a web logueado
        console.log(res)
      }
    });
  }

  get formValid(): boolean {
    return this.form.valid
  }
}
