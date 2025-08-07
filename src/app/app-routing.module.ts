import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { FilmsComponent } from './features/films/films.component';
import { PlaygroundComponent } from './core/playground/playground.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'films', component: FilmsComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/films/film-details/film-details.component').then(
        (c) => c.FilmDetailsComponent
      ),
  },
  { path: 'playground', component: PlaygroundComponent },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
