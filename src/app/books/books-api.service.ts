import { Book } from './books';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getLastFiveBooks() {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/books/lastbooks`);
  }

  removeBook(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/books/${id}`);
  }

  findBookById(id: number) {
    return this.httpClient.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  saveBook(book: Book): Observable<Book> {
    if (book.id) {
      return this.httpClient.put<Book>(`${environment.apiUrl}/books/${book.id}`, book);
    }

    return this.httpClient.post<Book>(`${environment.apiUrl}/books`, book);
  }

}
