import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';
import {jwtDecode, JwtPayload} from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
  userId?: number;
  role?: string;
}

export interface User {
  token: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'jwtToken';
  private baseUrl = environment.apiBaseUrl + '/api/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/register`, user)
  }

  login(credentials: { password: string; email: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials, {
      responseType: 'json',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.userId ?? null;
  }


}
