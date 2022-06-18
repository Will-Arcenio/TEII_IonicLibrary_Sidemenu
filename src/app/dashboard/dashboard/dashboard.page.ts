import { Component, OnInit } from '@angular/core';
import { BooksApiService } from '../../books/books-api.service';
import { Book } from '../../books/books';
import { finalize } from 'rxjs/operators';
import { ViewWillEnter } from '@ionic/angular';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  loading = false;
  loadingTotal = false;

  books: Book[];
  allBooks: Book[];

  qtyBooks = 0;

  constructor(
    private booksApiService: BooksApiService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.getLast5Books();
    // this.getAllBooks();
    // this.getQtyBook();
  }

  ionViewWillEnter(): void {
    this.getLast5Books();
    this.getAllBooks();
    // this.getQtyBook();
  }

  getLast5Books() {
    this.loading = true;
    this.booksApiService.getLastFiveBooks().pipe(finalize(() => this.loading = false)).subscribe(
      (book) => {
        this.books = book;
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao carregar os livros`, () => this.getLast5Books());
      }
    );
  }

  getAllBooks() {
    this.loading = true;
    this.booksApiService.getBooks().pipe(finalize(() => this.loading = false)).subscribe(
      (book) => {
        this.allBooks = book;
      }
    );
  }

  // getQtyBook() {
  //   this.loadingTotal = true;
  //   this.booksApiService.getBooks().pipe(finalize(() => this.loadingTotal = false)).subscribe(
  //     (book) => {
  //       this.qtyBooks = this.allBooks.length;
  //       console.log(this.allBooks.length);
  //     }
  //   );
  // }

}
