import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private baseUrl = environment.apiBaseUrl + '/api/users';

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  register(user: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/users/register`, user)
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/login`, loginData, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


}
