import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

export interface Topic {
  topicId: number;
  topicTitle: string;
  topicDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = environment.apiBaseUrl + '/api/topics';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/getAll`);
  }

  getTotalTopics(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
