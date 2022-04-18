import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsListPage } from './authors-list.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsListPageRoutingModule {}
