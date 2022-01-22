import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@presentation/presentation.module').then(
        (m) => m.PresentationModule
      )
  }
];

export const appRoutingModule: ModuleWithProviders<AppModule> =
  RouterModule.forRoot(routes, { useHash: true });
