import { Injectable } from '@angular/core';
import { BooksApiService } from './books-api.service';
import { MessageService } from '../services/message.service';
import { forkJoin, Observable, of } from 'rxjs';
import { Book } from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksFavoriteService {
  booksIds: number[];

  constructor(
    private booksApiService: BooksApiService,
    private messageService: MessageService
  ) {
    this.booksIds = JSON.parse(localStorage.getItem('booksFavorite')) ?? [];
  }

  getBooksFavorite(): Observable<Book[]> {
    const requests = this.booksIds.map((bookId) => this.booksApiService.findBookById(bookId));

    return requests.length ? forkJoin(requests) : of([]);
  }

  addFavoriteBook({id, nome}: Book) {
    if (this.booksIds.some((bookId) => bookId === id)) {
      this.messageService.showErrorMessage(`O livro '${nome}' já está nos seus favoritos`);
      return;
    }

    this.booksIds = [...this.booksIds, id];
    localStorage.setItem('booksFavorite', JSON.stringify(this.booksIds));
    this.messageService.showSuccessMessage(`O livro '${nome}' foi adicionado aos favoritos`);
  }

  removeFavoriteBook({id, nome}: Book) {
    this.booksIds = this.booksIds.filter((bookId) => bookId !== id);
    localStorage.setItem('booksFavorite', JSON.stringify(this.booksIds));
    this.messageService.showSuccessMessage(`O livro '${nome}' foi removido dos favoritos`);
  }
}
