import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModel } from '@app/domain/models/payment.model';
import { AddPaymentModel } from '@app/shared/forms-model/add-payment.model';
import { FormHelper } from '@app/shared/helpers/form.helper';
import { NotificationService } from '@app/shared/services/notification.service';
import { AddPaymentModalComponent } from '../modals/add-payment/add-payment-modal.component';
import { DeletePaymentComponent } from '../modals/delete-payment/delete-payment.component';

@Component({
  selector: 'app-actions-table',
  templateUrl: 'actions-table.component.html'
})
export class ActionsTableComponent extends FormHelper implements OnInit {
  @Input() payment: PaymentModel;
  constructor(@SkipSelf() private readonly dialog: MatDialog) {
    super(new AddPaymentModel());
  }

  ngOnInit() {}

  public editPayment() {
    this.dialog.open(AddPaymentModalComponent, {
      autoFocus: false
    }).componentInstance.payment = this.payment;
  }
  public deletePayment() {
    this.dialog.open(DeletePaymentComponent, {
      autoFocus: false
    }).componentInstance.id = this.payment.id;
  }
}
