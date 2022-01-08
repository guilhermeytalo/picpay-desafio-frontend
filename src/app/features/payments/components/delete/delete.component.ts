import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from '@/features/payments/models/payments.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() payment!: Payment;
  isVisible = false;
  @Output() delete: EventEmitter<Payment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  show(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

}
