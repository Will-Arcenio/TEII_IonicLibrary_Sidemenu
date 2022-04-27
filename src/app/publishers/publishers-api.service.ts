import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Publishers } from './publishers';

@Injectable({
  providedIn: 'root'
})
export class PublishersApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPublishers(): Observable<Publishers[]> {
    return this.httpClient.get<Publishers[]>(`${environment.apiUrl}/publishers`);
  }

  findPublisherById(id: number) {
    return this.httpClient.get<Publishers>(`${environment.apiUrl}/publishers/${id}`);
  }

  removePublisher(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/publishers/${id}`);
  }

  savePublisher(publisher: Publishers): Observable<Publishers> {
    // Edit and Save the author if it exists
    if (publisher.id) {
      return this.httpClient.put<Publishers>(`${environment.apiUrl}/publishers/${publisher.id}`, publisher);
    }

    // Save the author if not exists
    return this.httpClient.post<Publishers>(`${environment.apiUrl}/publishers`, publisher);
  }
}
