import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorsRegisterPageRoutingModule } from './authors-register-routing.module';

import { AuthorsRegisterPage } from './authors-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorsRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthorsRegisterPage]
})
export class AuthorsRegisterPageModule {}
