import { Component, OnInit } from '@angular/core';
import { Books } from '../books';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit {

  book: Books;

  constructor() { }

  ngOnInit() {
  }

}
