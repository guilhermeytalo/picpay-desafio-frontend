import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MeusPagamentosComponent } from './meus-pagamentos.component';
import { HeaderComponent } from 'src/app/components/template/header/header.component';
import { PaymentCreateComponent } from 'src/app/components/payment/payment-create/payment-create.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PaymentReadComponent } from 'src/app/components/payment/payment-read/payment-read.component';




@NgModule({
  declarations: [
    MeusPagamentosComponent,
    HeaderComponent,
    PaymentCreateComponent,
    PaymentReadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MeusPagamentosRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class MeusPagamentosModule { }
