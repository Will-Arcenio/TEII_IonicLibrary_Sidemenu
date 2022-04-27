import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishersRegisterPage } from './publishers-register.page';

const routes: Routes = [
  {
    path: '',
    component: PublishersRegisterPage
  },
  {
    path: ':id',
    component: PublishersRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishersRegisterPageRoutingModule {}
