import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authors } from './authors';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  //
  getAuthors(): Observable<Authors[]> {
    return this.httpClient.get<Authors[]>(`${environment.apiUrl}/authors`);
  }

  findAuthorById(id: number) {
    return this.httpClient.get<Authors>(`${environment.apiUrl}/authors/${id}`);
  }

  removeAuthor(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/authors/${id}`);
  }

  saveAuthor(author: Authors): Observable<Authors> {
    // Edit and Save the author if it exists
    if (author.id) {
      console.log(`${environment.apiUrl}/authors/${author.id}`);
      return this.httpClient.put<Authors>(`${environment.apiUrl}/authors/${author.id}`, author);
    }

    // Save the author if not exists
    return this.httpClient.post<Authors>(`${environment.apiUrl}/authors`, author);
  }
}
