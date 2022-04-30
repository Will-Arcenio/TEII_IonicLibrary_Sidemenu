/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
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

  }

  getBooksFavorite() {
    let favorites = localStorage.getItem('booksFavorite');

    if (favorites) {
      return JSON.parse(favorites);
    }
    return [];
  }

  putOnLocalStorage(books: Book[]) {
    localStorage.setItem('booksFavorite', JSON.stringify(books));

    //   this.messageService.showErrorMessage(`O livro '${nome}' já está nos seus favoritos`);
  }

  removeFavoriteBook(book: Book) {
    let favorites = this.getBooksFavorite();

    favorites = favorites.filter((f) => f.id != book.id);
    this.messageService.showSuccessMessage(`O livro '${book.nome}' foi removido dos favoritos`);
    this.putOnLocalStorage(favorites);
  }

  addFavoriteBook(book: Book) {
    let favorites = this.getBooksFavorite();

    if (favorites.find((f) => f.id == book.id)) {
      // Remover dos favoritos o Livro caso já esteja e clique novamente
      this.removeFavoriteBook(book);
    } else {
      favorites.push(book);
      this.messageService.showSuccessMessage(`O livro '${book.nome}' foi adicionado aos favoritos`);
      this.putOnLocalStorage(favorites);
    }
  }
}
