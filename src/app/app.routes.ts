import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route
];
