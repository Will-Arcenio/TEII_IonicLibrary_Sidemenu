import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishersListPage } from './publishers-list.page';

const routes: Routes = [
  {
    path: '',
    component: PublishersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishersListPageRoutingModule {}
