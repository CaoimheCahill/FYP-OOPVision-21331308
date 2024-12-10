import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';

export interface Topic {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = environment.apiBaseUrl + '/api/topics'; // Adjust URL if necessary

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }
}
