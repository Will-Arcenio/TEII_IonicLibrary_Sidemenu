import { Component, OnInit } from '@angular/core';
import { Book } from '../books';
import { BooksFavoriteService } from '../books-favorite.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-books-favorite',
  templateUrl: './books-favorite.page.html',
  styleUrls: ['./books-favorite.page.scss'],
})
export class BooksFavoritePage implements OnInit, ViewWillEnter {
  loading = false;
  books: Book[];

  constructor(
    private booksFavorite: BooksFavoriteService
  ) { }

  ngOnInit() {
    this.loadBooksFavorite();
  }

  ionViewWillEnter(): void {
    this.loadBooksFavorite();
  }

  loadBooksFavorite() {
    this.loading = true;
    this.booksFavorite.getBooksFavorite().subscribe(
      (book) => {
        this.books = book;
        this.loading = false;
      }
    );
  }

  removeFavBook(book: Book) {
    this.booksFavorite.removeFavoriteBook(book);
    this.loadBooksFavorite();
  }

}
