import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: "sleepiness",
    loadChildren: () => import('./modals/sleepiness/sleepiness.module').then(m => m.SleepinessPageModule)
  },
  {
    path: "overnight",
    loadChildren: () => import('./modals/overnight/overnight.module').then(m => m.OvernightPageModule)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
