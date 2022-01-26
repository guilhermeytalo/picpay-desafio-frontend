import { Component, OnInit, SkipSelf } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentModalComponent } from '../modals/add-payment/add-payment-modal.component';

@Component({
  selector: 'app-add-payment',
  templateUrl: 'add-payment-button.component.html',
  styleUrls: ['add-payment-button.component.scss']
})
export class AddPaymentButtonComponent implements OnInit {
  constructor(@SkipSelf() private readonly dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(AddPaymentModalComponent, { autoFocus: false });
  }
}
