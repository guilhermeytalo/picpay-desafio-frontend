import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsService } from '../../../services/payments/payments.service';
import { FormatterService } from '../../../services/formatter/formatter.service';

@Component({
  selector: 'app-payments-remove',
  templateUrl: './payments-remove.component.html',
  styleUrls: ['./payments-remove.component.scss']
})
export class PaymentsRemoveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentsRemoveComponent>,
    private paymentsService: PaymentsService,
    public formatterService: FormatterService,
    @Inject(MAT_DIALOG_DATA) public data: { payment }
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick() {
    this.dialogRef.close(this.data.payment);
  }
}
