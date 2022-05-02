/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';
import { Book } from '../books';
import { BooksApiService } from '../books-api.service';
import { BooksFavoriteService } from '../books-favorite.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, ViewWillEnter {

  books: Book[] = [];
  loading = false;
  booksFavorite: Book[] = [];

  constructor(
    private booksApiService: BooksApiService,
    private messageService: MessageService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
    private booksFavoriteService: BooksFavoriteService
  ) { }

  ngOnInit() {
    this.refreshItems();
  }
  ionViewWillEnter(): void {
    this.refreshItems();
  }

  // Reload Items
  refreshItems() {
    this.listBooks();
    this.getFavoriteBooks();
  }

  // List Books
  listBooks() {
    this.loading = true;
    this.booksApiService.getBooks().pipe(finalize(() => this.loading = false)).subscribe(
      (books) => {
        this.books = books;
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao carregar os livros disponíveis.`, () => this.listBooks());
      }
    );
  }

  // Book Remove
  removeBook(book: Book) {
    this.loading = true;
    this.booksApiService.removeBook(book.id).subscribe(
      () => {
        this.messageService.showSuccessMessage(`O livro '[${ book.referencia }] - ${ book.nome }' foi excluído com sucesso.`);
        this.listBooks();
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao excluir o livro '[${ book.referencia }] - ${ book.nome }'.`, () => this.removeBook(book));
        this.loading = false;
      }
    );
  }

  // Confirm Book Remove
  confirmRemoveBook(book: Book) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Deseja excluir o livro '${book.nome}'?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.removeBook(book)
        },
        {
          text: 'Não'
        }
      ]
    }).then((alert) => alert.present());
  }

  // Botão para mostrar as opções na listagem
  async showOptions(book: Book) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      cssClass: 'menu-options',
      buttons: [{
        text: 'Editar',
        icon: 'pencil',
        data: 10,
        handler: () => {
          this.router.navigate([`/books-register/`, book.id]);
          this.loading = true;
        }
      },
      {
        text: 'Favoritar',
        icon: 'heart',
        cssClass: this.isFavorite(book) ? 'isFavorite' : '',
        handler: () => {
          this.booksFavoriteService.addFavoriteBook(book);
          this.refreshItems();
        }
      },
      {
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.confirmRemoveBook(book);
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  addFavoriteBook(book: Book) {
    this.booksFavoriteService.addFavoriteBook(book);
  }

  getFavoriteBooks() {
    this.booksFavorite = this.booksFavoriteService.getBooksFavorite();
  }

  isFavorite(book: Book) {
    return this.booksFavorite.find((bookFav) => bookFav.id == book.id) != null;
  }

}
