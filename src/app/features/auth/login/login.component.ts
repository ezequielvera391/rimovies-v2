import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from "../../../shared/password-input/password-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PasswordInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

}
