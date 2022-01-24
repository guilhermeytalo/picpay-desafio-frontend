import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/infra/guard/auth.guard';
import { SessionGuard } from '@infra/guard/session.guard';
import { PresentationModule } from '@presentation/presentation.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@presentation/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
    canLoad: [SessionGuard]
  },
  {
    path: 'payments',
    pathMatch: 'full',

    loadChildren: () =>
      import('@app/presentation/pages/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
    canLoad: [AuthGuard]
  }
];

export const presentationRoutingModule: ModuleWithProviders<PresentationModule> =
  RouterModule.forChild(routes);
