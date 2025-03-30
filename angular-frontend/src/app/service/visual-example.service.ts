import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface VisualExample {
  visualExampleId: number;
  topicId: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisualExampleService {
  private apiUrl = environment.apiBaseUrl + '/api/admin/example';

  constructor(private http: HttpClient) {
  }

  // Get all visual examples for a given topic
  getVisualExamplesByTopic(topicId: number): Observable<VisualExample[]> {
    return this.http.get<VisualExample[]>(`${this.apiUrl}/topics/${topicId}`);
  }
}
