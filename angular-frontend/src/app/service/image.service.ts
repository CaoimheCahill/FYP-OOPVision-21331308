import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';

export interface Image {
  imageId: number;
  topicId: number;
  imagePath: string;
  imageSide: 'left' | 'right';
  orderIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiBaseUrl + '/api/images';

  constructor(private http: HttpClient) {}

  getImagesByTopic(topicId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/${topicId}`);
  }
}
