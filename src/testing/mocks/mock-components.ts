import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from 'src/app/core/interfaces/films.interface';

// Mocks for standalone components
@Component({ selector: 'app-backdrop-image', template: '', standalone: true })
export class MockBackdropImageComponent {
  @Input() imageUrl!: string;
}

@Component({ selector: 'app-base-card', template: '', standalone: true })
export class MockBaseCardComponent {
  @Input() imageUrl!: string;
  @Input() size!: string;
  @Input() goToUrl?: string;
}

@Component({
  selector: 'app-film-card',
  standalone: true,
  template: '',
})
export class MockFilmCardComponent {
  @Input() data!: Film;
  @Input() id!: string;
}


@Component({ selector: 'app-chip', template: '', standalone: true })
export class MockChipComponent {
  @Input() label!: string;
}

@Component({ selector: 'app-divider', template: '', standalone: true })
export class MockDividerComponent {}

@Component({
  selector: 'app-search-input',
  standalone: true,
  template: '',
})
export class MockSearchInputComponent {
  @Input() placeholder!: string;
  @Input() data!: Film[];
  @Input() keys!: string[];
  @Output() emitSearch = new EventEmitter<Film[]>();
}

@Component({ selector: 'app-nav-bar', template: '', standalone: true })
export class MockNavBarComponent {
  @Input() navLinks: { name: string; path: string }[];
}

