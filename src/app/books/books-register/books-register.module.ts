import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksRegisterPageRoutingModule } from './books-register-routing.module';

import { BooksRegisterPage } from './books-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BooksRegisterPage]
})
export class BooksRegisterPageModule {}
