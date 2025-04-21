import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = (window as any).apiBaseUrl || 'http://localhost:8080/api';
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
