import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { debounceTime, first, switchMap } from 'rxjs/operators';
import { Payment } from 'src/app/shared/models/payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.scss']
})
export class PaymentUpdateComponent implements OnInit {

  formCreatePayment = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    username: this.fb.control('', [Validators.required]),
    title: this.fb.control('', [Validators.required]),
    value: this.fb.control('', [Validators.required]),
    date: this.fb.control('', [Validators.required]),
    isPayed: this.fb.control('', [Validators.required])
  });

  get name() { return this.formCreatePayment.get('name'); }
  get username() { return this.formCreatePayment.get('username'); }
  get title() { return this.formCreatePayment.get('title'); }
  get value() { return this.formCreatePayment.get('value'); }
  get date() { return this.formCreatePayment.get('date'); }
  get isPayed() { return this.formCreatePayment.get('isPayed'); }


  options: string[] = [];
  filteredOptions: string[];
  showName = false;
  task = new Payment();
  hasUsernameDb: boolean;

  constructor(
    public dialogRef: MatDialogRef<PaymentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.paymentService.get(this.data.id).subscribe(res => {

      this.task = {
        username: res.username,
        name: res.name,
        title: res.title,
        value: res.value,
        date: res.date,
        isPayed: res.isPayed,
        image: res.image,
        id: res.id
      };

      this.formCreatePayment.patchValue({
        date: this.toJSONLocal(this.task.date),
        name: this.task.name,
        title: this.task.title,
        username: this.task.username,
        value: this.task.value,
        isPayed: this.task.isPayed
      });

      this.username.disable();
      this.name.disable();
      this.formCreatePayment.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.task.date.split('T')[0] !== this.date.value) {
      const hora = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.task.date = new Date(`${this.date.value}T${hora}`).toISOString();
    }

    const form = this.formCreatePayment.controls;
    this.task = {
      username: form.username.value,
      name: form.name.value,
      title: form.title.value,
      value: form.value.value,
      date: this.task.date,
      isPayed: form.isPayed.value,
      image: this.task.image,
      id: this.task.id
    };

    this.paymentService.update(this.task).subscribe(res => {
      this.onNoClick();
      this.paymentService.UpdatedTable.next();
    },
    (err) => {
      console.log(err);
      alert('Ocorreu um erro no envio do pagamento');
    } );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toJSONLocal(date): string {
    const local = new Date(date);
    return local.toJSON().slice(0, 10);
  }

}
