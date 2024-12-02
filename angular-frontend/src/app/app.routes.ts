import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route for home
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent }
];

