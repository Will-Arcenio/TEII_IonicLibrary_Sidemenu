import { Component, OnInit } from '@angular/core';
import { Book } from '../books';
import { BooksFavoriteService } from '../books-favorite.service';
import { ViewWillEnter, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-books-favorite',
  templateUrl: './books-favorite.page.html',
  styleUrls: ['./books-favorite.page.scss'],
})
export class BooksFavoritePage implements OnInit, ViewWillEnter {
  loading = false;
  books: Book[] = [];

  constructor(
    private booksFavoriteService: BooksFavoriteService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadBooksFavorite();
  }

  ionViewWillEnter(): void {
    this.loadBooksFavorite();
  }

  loadBooksFavorite() {
    this.loading = true;
    this.books = this.booksFavoriteService.getBooksFavorite();
    this.loading = false;
  }

  // Confirm Book Remove
  confirmRemoveFavBook(book: Book) {
    this.alertController.create({
      header: 'Remover dos Favoritos',
      message: `Deseja remover dos favoritos o livro '${book.nome}'?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.removeFavBook(book)
        },
        {
          text: 'Não'
        }
      ]
    }).then((alert) => alert.present());
  }

  removeFavBook(book: Book) {
    this.booksFavoriteService.removeFavoriteBook(book);
    this.loadBooksFavorite();
  }

}
