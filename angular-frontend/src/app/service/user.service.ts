import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private baseUrl = environment.apiBaseUrl + '/api/users';

  constructor(private http: HttpClient, private configService: ConfigService) { }

  register(user: any): Observable<any>{
    return this.http.post(`${this.configService.getApiBaseUrl()}/api/users/register`, user)
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.configService.getApiBaseUrl()}/api/users/login`, loginData, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


}
