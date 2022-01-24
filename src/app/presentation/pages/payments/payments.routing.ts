import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationModule } from '@presentation/presentation.module';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent
  }
];

export const paymentsRoutingModule: ModuleWithProviders<PresentationModule> =
  RouterModule.forChild(routes);
