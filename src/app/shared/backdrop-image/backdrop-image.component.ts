import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backdrop-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backdrop-image.component.html',
  styleUrls: ['./backdrop-image.component.scss'],
})
export class BackdropImageComponent {
  @Input() imageUrl: string;
  // TODO: Create a empty state for when imageUrl is null
}
