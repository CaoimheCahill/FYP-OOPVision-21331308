import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

export interface Image {
  imageId: number;
  visualExampleId: number;
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

  getImagesByVisualExampleId(visualExampleId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/${visualExampleId}`);
  }
}
