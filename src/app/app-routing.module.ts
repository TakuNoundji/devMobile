import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./features/common/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./features/common/register/register.module').then( m => m.RegisterPageModule)
  },
  // {
  //   path: 'rubriques',
  //   loadChildren: () => import('./features/views/rubriques/rubriques.module').then( m => m.RubriquesPageModule)
  // },
  {
    path: 'details-rubriques',
    loadChildren: () => import('./features/views/details-rubriques/details-rubriques.module').then( m => m.DetailsRubriquesPageModule)
  },

  {
    path: 'rubriques',
    loadChildren: () => import('./features/views/rubriques/rubriques.module').then( m => m.RubriquesPageModule)
  },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./features/common/settings/settings.module').then( m => m.SettingsPageModule)
  // },
  {
    path: 'profile',
    loadChildren: () => import('./features/common/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'congratulations',
    loadChildren: () => import('./features/views/congratulations/congratulations.module').then( m => m.CongratulationsPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./features/views/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./features/views/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'choice-level',
    loadChildren: () => import('./features/views/choice-level/choice-level.module').then( m => m.ChoiceLevelPageModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./core/features/common/players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./features/common/players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'dual',
    loadChildren: () => import('./features/views/dual/dual.module').then( m => m.DualPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
