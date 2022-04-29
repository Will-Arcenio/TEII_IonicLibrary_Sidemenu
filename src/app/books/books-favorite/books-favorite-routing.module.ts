import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksFavoritePage } from './books-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: BooksFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksFavoritePageRoutingModule {}
