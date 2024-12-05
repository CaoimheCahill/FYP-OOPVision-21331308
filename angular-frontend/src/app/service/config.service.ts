import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly apiBaseUrl: string;

  constructor() {
    // Dynamically load environment variable from Azure Static Web Apps
    this.apiBaseUrl = (window as any).apiBaseUrl || 'http://localhost:8080/api'; // Fallback for local development
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
