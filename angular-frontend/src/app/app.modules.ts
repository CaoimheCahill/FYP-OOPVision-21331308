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

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
        { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
        { path: 'registration', loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent) },
        { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
        { path: 'topics', loadComponent: () => import('./topics/topics.component').then(m => m.TopicsComponent) },
        { path: 'progress', loadComponent: () => import('./progress/progress.component').then(m => m.ProgressComponent) },
      ]),
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
    ),
  ],
}).catch(err => console.error(err));
