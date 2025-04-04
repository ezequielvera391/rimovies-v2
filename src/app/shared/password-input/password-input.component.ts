import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent {
  @Input() placeholder: string = 'Password';
  @Input() label: string;
  @Input() formControlName: string;
  @Input() ariaLabel: string = 'Password';

  public showPassword: boolean = false;
  public imgIcon: string;

  ngOnInit(): void {
    this.imgIcon = 'assets/images/icons/visibility_off.svg';
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.imgIcon = 'assets/images/icons/visibility_on.svg')
      : (this.imgIcon = 'assets/images/icons/visibility_off.svg');
  }
}
