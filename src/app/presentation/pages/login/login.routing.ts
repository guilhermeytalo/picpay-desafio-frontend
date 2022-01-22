import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '@presentation/pages/login/login.module';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

export const loginRoutingModule: ModuleWithProviders<LoginModule> =
  RouterModule.forChild(routes);
