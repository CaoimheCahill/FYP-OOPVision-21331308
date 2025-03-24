import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl = environment.apiBaseUrl + '/api/progress';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getUserProgress(userId: number | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  markViewedExample(topicId: number): Observable<any> {
    const body = { topicId };
    return this.http.post(`${this.apiUrl}/mark-viewed`, body);
  }

  markQuizFinished(topicId: number, score: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/mark-quiz-finished`, { topicId, score });
  }
}
