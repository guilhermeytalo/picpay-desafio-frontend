import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './core/guards/login-guard.service';
import { MeusPagamentosGuardService } from './core/guards/meus-pagamentos-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canLoad: [LoginGuardService]
  },
  {
    path: 'meus-pagamentos',
    loadChildren: () => import('./pages/meus-pagamentos/meus-pagamentos.module').then(m => m.MeusPagamentosModule),
    canLoad: [MeusPagamentosGuardService]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    LoginGuardService,
    MeusPagamentosGuardService
  ]
})
export class AppRoutingModule { }
