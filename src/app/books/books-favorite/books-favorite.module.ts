import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksFavoritePageRoutingModule } from './books-favorite-routing.module';

import { BooksFavoritePage } from './books-favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksFavoritePageRoutingModule
  ],
  declarations: [BooksFavoritePage]
})
export class BooksFavoritePageModule {}
