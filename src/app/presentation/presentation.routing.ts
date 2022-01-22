import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationModule } from '@presentation/presentation.module';
import { PresentationComponent } from './presentation.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent
    // loadChildren: () =>
    //   import('@presentation/presentation.module').then(
    //     (m) => m.PresentationModule
    //   )
  }
];

export const presentationRoutingModule: ModuleWithProviders<PresentationModule> =
  RouterModule.forChild(routes);
