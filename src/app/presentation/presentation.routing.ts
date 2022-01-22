import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationModule } from '@presentation/presentation.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@presentation/pages/login/login.module').then(
        (m) => m.LoginModule
      )
  }
];

export const presentationRoutingModule: ModuleWithProviders<PresentationModule> =
  RouterModule.forChild(routes);
