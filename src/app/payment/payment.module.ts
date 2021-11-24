import { Injector, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { DialogAddPaymentComponent } from './components/dialog-add-payment/dialog-add-payment.component';
import { FilterPaymentComponent } from './components/list-payment/filter-payment/filter-payment.component';
import { ListPaymentComponent } from './components/list-payment/list-payment.component';
import { TablePaymentComponent } from './components/list-payment/table-payment/table-payment.component';
import { PaymentInjectorInstance } from './payment-injector-instance';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [PaymentComponent, ListPaymentComponent, TablePaymentComponent, DialogAddPaymentComponent, FilterPaymentComponent],
  imports: [PaymentRoutingModule, SharedModule]
})
export class PaymentModule {
  constructor(private injector: Injector) {
    PaymentInjectorInstance.setInjector(this.injector);
  }
}
