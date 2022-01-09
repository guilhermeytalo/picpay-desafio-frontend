import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from '../../models/payments.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() payment!: Payment;

  editedPayment: Payment;
  isVisible = false;

  @Output() edit: EventEmitter<Payment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.editedPayment = { ...this.payment } as Payment;
  }

  show(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  editPayment(): void {
    this.edit.emit(this.editedPayment);
    this.close();
  }

}
