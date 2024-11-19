import { provideRouter, Routes } from '@angular/router';
import {ApplicationConfig} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // Handle unknown routes
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),]
};
