import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}


  analyzeSentiment(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sentiment`, { text });
  }

  summarizeText(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/explain`, { text });
  }

  getImageCaption(files: File[]): Observable<{ filename: string; caption: string }[]> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);  //"files" muss zum Backend passen
    }
    return this.http.post<{ filename: string; caption: string }[]>(`${this.baseUrl}/caption`, formData);
  }

  getImage(text: string): Observable<{ image: string }> {
    return this.http.post<{ image: string }>(`${this.baseUrl}/imageGenerator`, { text });
  }
}
