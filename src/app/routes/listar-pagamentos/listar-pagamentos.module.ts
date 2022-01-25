import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPagamentosComponent } from './listar-pagamentos.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', component: ListarPagamentosComponent},
];

@NgModule({
  declarations: [
    ListarPagamentosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ListarPagamentosModule { }
