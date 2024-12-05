import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

// Function to retrieve the `apiBaseUrl` dynamically
function getApiBaseUrl(): string {
  const apiBaseUrl = (window as any).apiBaseUrl;
  if (!apiBaseUrl) {
    console.warn('API_BASE_URL is not set. Using fallback.');
  }
  return apiBaseUrl || 'http://localhost:8080/api'; // Fallback
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: 'API_BASE_URL', useFactory: getApiBaseUrl }, // Provide API_BASE_URL dynamically
  ],
};
