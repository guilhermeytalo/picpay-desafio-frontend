import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app/presentation/components/components.module';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentsComponent } from './payments.component';
import { paymentsRoutingModule } from './payments.routing';

@NgModule({
  imports: [
    TranslocoModule,
    ComponentsModule,
    RouterModule,
    paymentsRoutingModule
  ],
  exports: [],
  declarations: [PaymentsComponent],
  providers: []
})
export class PaymentsModule {}
