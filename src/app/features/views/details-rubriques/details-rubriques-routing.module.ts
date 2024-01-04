import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsRubriquesPage } from './details-rubriques.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsRubriquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRubriquesPageRoutingModule {}
