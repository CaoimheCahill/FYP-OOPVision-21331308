import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {HttpClient} from '@angular/common/http';

// Expose runtime configuration variables
function getApiBaseUrl(): string {
  const apiBaseUrl = (window as any).apiBaseUrl; // Access injected environment variable
  if (!apiBaseUrl) {
    console.error('API base URL not set in Azure environment variables.');
  }
  return apiBaseUrl || 'http://localhost:8080'; // Fallback for local development
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'API_BASE_URL', useFactory: getApiBaseUrl },
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
        { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
        { path: 'registration', loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent) },
      ]),
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      HttpClient
    ),
  ],
}).catch(err => console.error(err));
