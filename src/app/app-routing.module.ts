import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { FilmsComponent } from './features/films/films.component';
import { PlaygroundComponent } from './core/playground/playground.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'films/:id', loadComponent: () => import('./features/films/film-details/film-details.component').then(c => c.FilmDetailsComponent) },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }, // TODO: añadir un guard para detectar si es dev
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
