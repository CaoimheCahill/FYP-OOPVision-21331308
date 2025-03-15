import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl = environment.apiBaseUrl + '/api/progress';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getUserProgress(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
