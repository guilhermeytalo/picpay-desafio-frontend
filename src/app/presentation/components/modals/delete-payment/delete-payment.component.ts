import { Component, Input, SkipSelf } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPayment } from '@app/domain/usecases/payments';
import { ISnackBar } from '@app/shared/interfaces/isnackbar';
import { NotificationService } from '@app/shared/services/notification.service';

@Component({
  selector: 'app-delete-payment',
  templateUrl: 'delete-payment.component.html',
  styleUrls: ['delete-payment.component.scss']
})
export class DeletePaymentComponent {
  @Input() id: number;
  private _loading = false;
  constructor(
    @SkipSelf() private readonly paymentsService: IPayment,
    @SkipSelf() private readonly snackbar: ISnackBar,
    @SkipSelf() private readonly notification: NotificationService,
    @SkipSelf() private readonly dialogRef: MatDialog
  ) {}

  public delete(): void {
    this._loading = true;
    this.paymentsService.deletePayment(this.id).subscribe((_) => {
      this._loading = false;
      this.dialogRef.closeAll();
      this.notification.notify();
      this.snackbar.openSnackBar('payments.message.delete', 'success');
    });
  }
  get loading() {
    return this._loading;
  }
}
