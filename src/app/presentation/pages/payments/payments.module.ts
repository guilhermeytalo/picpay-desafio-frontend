import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app/presentation/components/components.module';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentsComponent } from './payments.component';
import { paymentsRoutingModule } from './payments.routing';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TranslocoModule,
    ComponentsModule,
    RouterModule,
    ComponentsModule,
    paymentsRoutingModule
  ],
  exports: [],
  declarations: [PaymentsComponent],
  providers: []
})
export class PaymentsModule {}
