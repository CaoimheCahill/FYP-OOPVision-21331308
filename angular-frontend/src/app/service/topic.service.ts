import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';

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

  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${environment.apiBaseUrl}/api/admin/topics/${id}`);
  }

  createTopic(topic: Partial<Topic>): Observable<Topic>{
    return this.http.post<Topic>(`${environment.apiBaseUrl}/api/admin/topics`, topic)
  }

  updateTopic(id: number, topic: Partial<Topic>): Observable<Topic> {
    return this.http.put<Topic>(`${environment.apiBaseUrl}/api/admin/topics/${id}`, topic,
      { responseType: 'text' as 'json' });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/api/admin/topics/${id}`,
      { responseType: 'text' as 'json' });
  }
}
