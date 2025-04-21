import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {jwtDecode, JwtPayload} from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
  userId?: number;
  role?: 'USER' | 'ADMIN';
}

export interface User {
  userId: number;
  token: string;
  email: string;
  password: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'jwtToken';
  private _mode = new BehaviorSubject<'PUBLIC'|'USER'|'ADMIN'>('PUBLIC');
  public mode$ = this._mode.asObservable();
  private baseUrl = environment.apiBaseUrl + '/api/users';

  constructor(private http: HttpClient) {this.refreshModeFromToken(); }

  refreshModeFromToken() {
    const token = this.getToken();
    if (!token) {
      this._mode.next('PUBLIC');
      return;
    }
    try {
      const { role } = jwtDecode<TokenPayload>(token);
      this._mode.next(role === 'ADMIN' ? 'ADMIN' : 'USER');
    } catch {
      this._mode.next('PUBLIC');
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/api/admin/all`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/api/admin/users/${userId}`,
      { responseType: 'text' as 'json' });
  }

  promoteUser(userId: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/api/admin/users/${userId}/promote`, {},
      { responseType: 'text' as 'json' });
  }

  demoteUser(userId: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/api/admin/users/${userId}/demote`, {},
      { responseType: 'text' as 'json' });
  }

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
    this.refreshModeFromToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._mode.next('PUBLIC');
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
