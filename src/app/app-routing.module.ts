import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'meus-pagamentos',
    loadChildren: () => import('./pages/meus-pagamentos/meus-pagamentos.module').then(m => m.MeusPagamentosModule),
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
