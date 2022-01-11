import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PaymentsComponent } from './views/payment/payments.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/payments', pathMatch: 'full' },
  { path: '**', redirectTo: '/payments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }