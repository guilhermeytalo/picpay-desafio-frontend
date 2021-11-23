import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosComponent } from './meus-pagamentos.component';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';



@NgModule({
  declarations: [
    MeusPagamentosComponent
  ],
  imports: [
    CommonModule,
    MeusPagamentosRoutingModule
  ]
})
export class MeusPagamentosModule { }
