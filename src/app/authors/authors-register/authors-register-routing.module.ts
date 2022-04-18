import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsRegisterPage } from './authors-register.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorsRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRegisterPageRoutingModule {}