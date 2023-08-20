import { Routes } from '@angular/router';
import { PrivateGuard } from './guard/private.guard';
import { PublicGuard } from './guard/public.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./presentation/Login/login.component').then(m => m.LoginComponent),
    canActivate: [PublicGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./presentation/Forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    pathMatch: 'full',
    canActivate: [PublicGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./presentation/dashboard/dashboard.routes').then( m => m.routes ),
    canActivate: [PrivateGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
