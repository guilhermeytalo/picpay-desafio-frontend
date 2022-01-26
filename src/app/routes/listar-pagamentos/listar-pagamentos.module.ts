import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPagamentosComponent } from './listar-pagamentos.component';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: ListarPagamentosComponent},
];

@NgModule({
  declarations: [
    ListarPagamentosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ListarPagamentosModule { }
