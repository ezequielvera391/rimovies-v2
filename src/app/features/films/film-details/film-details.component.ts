import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/core/interfaces/films.interface';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent {
  public id: string;
  public data: Film[]
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // TODO: reemplazar por llamado a servicio, obtener pelicula cuando este listo
    this.data = this.router.getCurrentNavigation()?.extras?.state?.['filmData'];
    if (!this.data) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
}
