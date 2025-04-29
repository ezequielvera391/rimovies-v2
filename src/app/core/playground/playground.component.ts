import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'src/app/shared/chip/chip.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

}
// Componente de uso interno para pruebas. No se testea porque no forma parte de producción.
