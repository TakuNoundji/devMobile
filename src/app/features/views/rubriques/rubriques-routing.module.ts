import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RubriquesPage } from './rubriques.page';

const routes: Routes = [
  {
    path: '',
    component: RubriquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RubriquesPageRoutingModule {}
