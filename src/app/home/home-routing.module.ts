import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },

      {
        path: 'rubriques',
        loadChildren: () => import('../features/views/rubriques/rubriques.module').then(m => m.RubriquesPageModule)
      },
      {
        path: 'parametres',
        loadChildren: () => import('../features/common/settings/settings.module').then(m => m.SettingsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
