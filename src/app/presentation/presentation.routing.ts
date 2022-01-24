import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationModule } from '@presentation/presentation.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@presentation/pages/login/login.module').then(
        (m) => m.LoginModule
      )
  },
  {
    path: 'tasks',
    pathMatch: 'full',

    loadChildren: () =>
      import('@app/presentation/pages/payments/payments.module').then(
        (m) => m.PaymentsModule
      )
  }
];

export const presentationRoutingModule: ModuleWithProviders<PresentationModule> =
  RouterModule.forChild(routes);
