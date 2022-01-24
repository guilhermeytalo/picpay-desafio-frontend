import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { paymentsRoutingModule } from './payments.routing';

@NgModule({
  imports: [RouterModule, paymentsRoutingModule],
  exports: [],
  declarations: [PaymentsComponent],
  providers: []
})
export class PaymentsModule {}
