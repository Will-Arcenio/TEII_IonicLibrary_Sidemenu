import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishersListPageRoutingModule } from './publishers-list-routing.module';

import { PublishersListPage } from './publishers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishersListPageRoutingModule
  ],
  declarations: [PublishersListPage]
})
export class PublishersListPageModule {}
