import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Livros', url: '/books-list', icon: 'library' },
    { title: 'Autores', url: '/authors-list', icon: 'person' },
    { title: 'Editoras', url: '/publishers-list', icon: 'journal' },
    { title: 'Favoritos', url: '/books-favorite', icon: 'star' }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
