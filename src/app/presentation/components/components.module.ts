import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@app/shared/services/notification.service';
import { TranslocoModule } from '@ngneat/transloco';
import { ISnackBar } from '@shared/interfaces/isnackbar';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { AddPaymentButtonComponent } from './add-payment/add-payment-button.component';
import AngularMaterialModule from './angular-material/angular-material.module';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { AddPaymentModalComponent } from './modals/add-payment-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SortTableComponent } from './sort-table/sort-table.component';
import { TablePaymentsComponent } from './table-payments/table-payments.component';
import { SnackBarService } from './toast/snackbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule,
    SortTableComponent,
    ActionsTableComponent,
    FilterTableComponent,
    PaginationComponent,
    AddPaymentButtonComponent,
    TablePaymentsComponent
  ],
  declarations: [
    SortTableComponent,
    ActionsTableComponent,
    FilterTableComponent,
    PaginationComponent,
    AddPaymentButtonComponent,
    TablePaymentsComponent,
    AddPaymentModalComponent
  ],
  providers: [
    NotificationService,
    {
      provide: ISnackBar,
      useClass: SnackBarService
    }
  ]
})
export class ComponentsModule {}
