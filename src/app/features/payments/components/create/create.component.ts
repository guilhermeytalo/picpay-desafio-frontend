import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreatePayment, Payment } from '../../models/payments.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  payment = {
    name: '',
    username: '',
    date: '',
    value: 0,
    title: ''
  } as CreatePayment;

  isVisible = false;

  @Output() create: EventEmitter<Payment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  show(): void {
    this.isVisible = true;
  }

  close(): void {
    this.payment = {} as Payment;
    this.isVisible = false;
  }

  createPayment(): void {
    this.create.emit(this.payment as Payment);
    this.close();
  }

  isFormValid(): boolean {
    return Object.keys(this.payment).every(_ => !!this.payment[_]);
  }

}
