import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ISnackBar } from '@shared/interfaces/isnackbar';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { AddPaymentButtonComponent } from './add-payment/add-payment.component';
import AngularMaterialModule from './angular-material/angular-material.module';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SortTableComponent } from './sort-table/sort-table.component';
import { SnackBarService } from './toast/snackbar';

@NgModule({
  imports: [TranslocoModule, AngularMaterialModule],
  exports: [
    FormsModule,
    AngularMaterialModule,
    SortTableComponent,
    ActionsTableComponent,
    FilterTableComponent,
    PaginationComponent,
    AddPaymentButtonComponent
  ],
  declarations: [
    SortTableComponent,
    ActionsTableComponent,
    FilterTableComponent,
    PaginationComponent,
    AddPaymentButtonComponent
  ],
  providers: [
    {
      provide: ISnackBar,
      useClass: SnackBarService
    }
  ]
})
export class ComponentsModule {}
