import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PaymentsComponent } from './views/payment/payments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: '', redirectTo: '/payments', pathMatch: 'full' },
  { path: '**', redirectTo: '/payments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }