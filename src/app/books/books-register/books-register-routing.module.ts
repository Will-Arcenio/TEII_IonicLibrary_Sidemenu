import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksRegisterPage } from './books-register.page';

const routes: Routes = [
  {
    path: '',
    component: BooksRegisterPage
  },
  {
    path: ':id',
    component: BooksRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRegisterPageRoutingModule {}
