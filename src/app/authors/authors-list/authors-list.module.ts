import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorsListPageRoutingModule } from './authors-list-routing.module';

import { AuthorsListPage } from './authors-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorsListPageRoutingModule
  ],
  declarations: [AuthorsListPage]
})
export class AuthorsListPageModule {}
