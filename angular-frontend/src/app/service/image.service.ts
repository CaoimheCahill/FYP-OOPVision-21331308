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

  // Create a new image (save)
  addImage(
    visualExampleId: number,
    file: File,
    imageSide: 'left' | 'right',
    orderIndex: number
  ): Observable<Image> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageSide', imageSide);
    formData.append('orderIndex', orderIndex.toString());
    return this.http.post<Image>(`${environment.apiBaseUrl}/api/admin/example/${visualExampleId}/images`, formData);
  }

  // Update an existing image
  updateImage(
    imageId: number,
    file: File | null,
    imageSide: 'left' | 'right',
    orderIndex: number
  ): Observable<Image> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('imageSide', imageSide);
    formData.append('orderIndex', orderIndex.toString());
    return this.http.put<Image>(`${environment.apiBaseUrl}/api/admin/example/images/${imageId}`, formData);
  }


  // Delete an image
  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/api/admin/example/images/${imageId}`, { responseType: 'text' as 'json' });
  }
}
