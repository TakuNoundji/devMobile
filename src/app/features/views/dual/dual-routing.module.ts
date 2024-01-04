import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DualPage } from './dual.page';

const routes: Routes = [
  {
    path: '',
    component: DualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DualPageRoutingModule {}
