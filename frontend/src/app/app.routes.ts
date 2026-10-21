
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(
        m => m.Home
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(
        m => m.LoginComponent
      )
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        m => m.RegisterComponent
      )
  },
  {
    path: 'screening',
    loadComponent: () =>
      import('./screening/screening.component').then(
        m => m.ScreeningComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
