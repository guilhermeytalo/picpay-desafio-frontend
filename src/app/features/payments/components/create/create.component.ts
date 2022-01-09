import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreatePayment, Payment } from '../../models/payments.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  payment: CreatePayment;

  isVisible = false;

  @Output() create: EventEmitter<Payment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.payment = this.getInitialCreatePayment();
  }

  show(): void {
    this.isVisible = true;
  }

  close(): void {
    this.payment = this.getInitialCreatePayment();
    this.isVisible = false;
  }

  createPayment(): void {
    this.create.emit(this.payment as Payment);
    this.close();
  }

  getInitialCreatePayment(): CreatePayment {
    return {
      name: '',
      username: '',
      date: '',
      value: 0,
      title: ''
    } as CreatePayment;
  }

  isFormValid(): boolean {
    return Object.keys(this.payment).every(_ => !!this.payment[_]);
  }

}
