import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishersRegisterPageRoutingModule } from './publishers-register-routing.module';

import { PublishersRegisterPage } from './publishers-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishersRegisterPageRoutingModule
  ],
  declarations: [PublishersRegisterPage]
})
export class PublishersRegisterPageModule {}
