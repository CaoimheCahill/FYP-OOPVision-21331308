import {Injectable} from '@angular/core';
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

  getVisualExampleById(visualExampleId: number): Observable<VisualExample> {
    return this.http.get<VisualExample>(`${this.apiUrl}/${visualExampleId}`);
  }

  createVisualExample(topicId: number, example: Partial<VisualExample>): Observable<VisualExample> {
    return this.http.post<VisualExample>(`${this.apiUrl}/topics/${topicId}`, example);
  }

  updateVisualExample(id: number, example: Partial<VisualExample>): Observable<VisualExample> {
    return this.http.put<VisualExample>(`${this.apiUrl}/${id}`, example);
  }

  deleteVisualExample(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text' as 'json'});
  }

}
