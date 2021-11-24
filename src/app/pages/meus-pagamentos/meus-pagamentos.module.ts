import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';

import { MeusPagamentosComponent } from './meus-pagamentos.component';
import { HeaderComponent } from 'src/app/components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MeusPagamentosComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MeusPagamentosRoutingModule
  ]
})
export class MeusPagamentosModule { }
