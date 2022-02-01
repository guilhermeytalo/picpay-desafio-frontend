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
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private paymentModalService: PaymentModalService
  ) {}


  ngOnInit(): void {
    this.addPaymentForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      value: [null, [Validators.required]],
      date: [null, [Validators.required]],
      title: [null, [Validators.required]],
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
    this.paymentModalService.pubFormData(this.addPaymentForm.value);
    this.dialogRef.close();
    console.log('submit?', this.data);
  }
}
