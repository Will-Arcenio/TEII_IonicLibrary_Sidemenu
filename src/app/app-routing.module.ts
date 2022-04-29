import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'books-list',
    loadChildren: () => import('./books/books-list/books-list.module').then( m => m.BooksListPageModule)
  },
  {
    path: 'books-register',
    loadChildren: () => import('./books/books-register/books-register.module').then( m => m.BooksRegisterPageModule)
  },
  {
    path: 'authors-register',
    loadChildren: () => import('./authors/authors-register/authors-register.module').then( m => m.AuthorsRegisterPageModule)
  },
  {
    path: 'authors-list',
    loadChildren: () => import('./authors/authors-list/authors-list.module').then( m => m.AuthorsListPageModule)
  },
  {
    path: 'publishers-list',
    loadChildren: () => import('./publishers/publishers-list/publishers-list.module').then( m => m.PublishersListPageModule)
  },
  {
    path: 'publishers-register',
    loadChildren: () => import('./publishers/publishers-register/publishers-register.module').then( m => m.PublishersRegisterPageModule)
  },
  {
    path: 'books-favorite',
    loadChildren: () => import('./books/books-favorite/books-favorite.module').then( m => m.BooksFavoritePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
