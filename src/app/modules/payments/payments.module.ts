import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPaymentComponent } from './components/dialog-payment/dialog-payment.component';
import { ViewPaymentDeleteComponent } from './components/view-payment-delete/view-payment-delete.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TablePaymentsComponent } from './components/table-payments/table-payments.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SelectLimitComponent } from './components/select-limit/select-limit.component';
import { PaginationPaymentComponent } from './components/pagination-payment/pagination-payment.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { AdvancedFiltersComponent } from './components/advanced-filters/advanced-filters.component';
import { BtnFilterComponent } from './components/btn-filter/btn-filter.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    PaymentsComponent,
    AddPaymentComponent,
    FormPaymentComponent,
    DialogPaymentComponent,
    ViewPaymentDeleteComponent,
    TablePaymentsComponent,
    ViewPaymentDeleteComponent,
    SelectLimitComponent,
    PaginationPaymentComponent,
    SearchUserComponent,
    AdvancedFiltersComponent,
    BtnFilterComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule
  ]
})
export class PaymentsModule { }
