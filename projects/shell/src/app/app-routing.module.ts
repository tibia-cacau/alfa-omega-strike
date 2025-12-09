import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../../../../projects/landing/src/app/app.module').then(
        (m) => m.AppModule
      ),
  },
  {
    path: 'alfa-vs-omega-strike',
    loadChildren: () =>
      import(
        '../../../../projects/alfa-vs-omega-strike/src/app/app.module'
      ).then((m) => m.AppModule),
  },
  {
    path: 'weekly-tasks',
    loadChildren: () =>
      import('../../../../projects/weekly-tasks/src/app/app.module').then(
        (m) => m.AppModule
      ),
  },
  {
    path: 'calculators',
    loadChildren: () =>
      import('../../../../projects/calculators/src/app/app.module').then(
        (m) => m.AppModule
      ),
  },
  {
    path: 'loot-split',
    loadChildren: () =>
      import('../../../../projects/loot-split/src/app/app.module').then(
        (m) => m.AppModule
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
