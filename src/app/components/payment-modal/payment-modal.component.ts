import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Payments} from '../../../models/payments';
import {PaymentModalService} from './payment-modal.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  addPaymentForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<PaymentModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { payments: Payments },
      private formBuilder: FormBuilder,
      private paymentModalService: PaymentModalService
  ) {}


  ngOnInit(): void {
    console.log(this.data);
    this.addPaymentForm = this.formBuilder.group({
      username: [this.data.payments.username, [Validators.required]],
      value: [this.data.payments.value, [Validators.required]],
      date: [this.data.payments.date, [Validators.required]],
      title: [this.data.payments.title, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage(value: keyof Payments) {
    if (
        this.addPaymentForm.get(value).hasError('required')
    ) {
      return 'Você precisa digitar um valor!';
    }
    return 'Campo Invalido';
  }

  onSubmit() {
    if (this.data.payments.id) {
      this.paymentModalService.pubEditData({payment: this.addPaymentForm.value, id: this.data.payments.id });
    } else {
      this.paymentModalService.pubFormData(this.addPaymentForm.value);
    }

    this.dialogRef.close();
    console.log('submit?', this.data);
  }
}
