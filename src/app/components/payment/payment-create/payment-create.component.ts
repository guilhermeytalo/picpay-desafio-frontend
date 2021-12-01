import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { debounceTime, first, switchMap } from 'rxjs/operators';
import { Payment } from 'src/app/shared/models/payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class PaymentCreateComponent implements OnInit {

  formCreatePayment = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    username: this.fb.control('', [Validators.required]),
    title: this.fb.control('', [Validators.required]),
    value: this.fb.control('', [Validators.required]),
    date: this.fb.control('', [Validators.required]),
    image: this.fb.control(''),
  });

  get name() { return this.formCreatePayment.get('name'); }
  get username() { return this.formCreatePayment.get('username'); }
  get title() { return this.formCreatePayment.get('title'); }
  get value() { return this.formCreatePayment.get('value'); }
  get date() { return this.formCreatePayment.get('date'); }
  get image() { return this.formCreatePayment.get('image'); }

  options: string[] = [];
  filteredOptions: string[];
  showName = false;
  task = new Payment();
  hasUsernameDb: boolean;

  constructor(
    public dialogRef: MatDialogRef<PaymentCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.username.valueChanges.pipe(
      debounceTime(200),
      switchMap(
        username =>  username !== '' ? this.paymentService.findUsernameLike(username) : of(username)
      )
    ).subscribe(data => {
      data ?
        this.filteredOptions = data.map(pay => pay.username) :
        this.filteredOptions = [];
    });
  }

  public findName(str: string): void {
    this.paymentService.findUsernameLike(str).subscribe(res => {
      this.options = res.map(pay => pay.name);
    });
  }

  public checkUsername(): void {
    this.paymentService.getPaymentByUsername(this.username.value)
    .pipe(
      first()
    )
    .subscribe(res => {
      if (res.length > 0) {
        this.name.setValue(res[0].name);
        this.name.disable();
        this.image.setValue(res[0].image);
        this.image.disable();

        this.hasUsernameDb = true;
      } else {
        this.name.enable();
        this.image.enable();
        if (this.hasUsernameDb) {
          this.name.setValue('');
          this.image.setValue('');
        }

        this.hasUsernameDb = false;
      }
    });
  }

  onSubmit(): void {
    const hora = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    const data = new Date(`${this.date.value}T${hora}`).toISOString();

    this.task = {
      name: this.name.value,
      username: this.username.value,
      title: this.title.value,
      value: this.value.value,
      date: data,
      image: this.image.value,
      isPayed: false,
    };

    this.paymentService.create(this.task).subscribe(res => {
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

}
