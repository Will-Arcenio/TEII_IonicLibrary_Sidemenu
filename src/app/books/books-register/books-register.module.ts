import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksRegisterPageRoutingModule } from './books-register-routing.module';

import { BooksRegisterPage } from './books-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksRegisterPageRoutingModule
  ],
  declarations: [BooksRegisterPage]
})
export class BooksRegisterPageModule {}
