import { Component, OnInit, SkipSelf } from '@angular/core';
import { NotificationService } from '@shared/services/notification.service';
import { AddPaymentModel } from '@shared/forms-model/add-payment.model';
import { FormHelper } from '@shared/helpers/form.helper';
import { MatDialog } from '@angular/material/dialog';
import { ISnackBar } from '@app/shared/interfaces/isnackbar';
import { IPayment } from '@app/domain/usecases/payments';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-payment-modal',
  templateUrl: 'add-payment-modal.component.html',
  styleUrls: ['add-payment-modal.component.scss']
})
export class AddPaymentModalComponent extends FormHelper implements OnInit {
  private _loading = false;
  constructor(
    @SkipSelf() private readonly notification: NotificationService,
    @SkipSelf() private dialogRef: MatDialog,
    @SkipSelf() private toast: ISnackBar,
    @SkipSelf() private paymentsService: IPayment
  ) {
    super(new AddPaymentModel());
  }

  ngOnInit() {}

  public onSave() {
    this._loading = true;
    this.form.controls.name.setValue(this.form.controls.username.value);
    this.form.controls.image.setValue(
      'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1'
    );
    this.paymentsService
      .addPayment(this.form.value)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe(() => {
        this.dialogRef.closeAll();
        this.notification.notify();
        this.toast.openSnackBar('payments.message.success', 'success');
      });
  }

  get loading() {
    return this._loading;
  }
}
