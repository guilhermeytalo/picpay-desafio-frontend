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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    MeusPagamentosComponent,
    HeaderComponent,
    PaymentCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MeusPagamentosRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class MeusPagamentosModule { }
