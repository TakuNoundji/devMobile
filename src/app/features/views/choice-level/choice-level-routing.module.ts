import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceLevelPage } from './choice-level.page';

const routes: Routes = [
  {
    path: '',
    component: ChoiceLevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoiceLevelPageRoutingModule {}
