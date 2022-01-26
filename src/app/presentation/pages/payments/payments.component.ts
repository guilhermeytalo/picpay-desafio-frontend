import { Component, OnInit, SkipSelf, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentModel } from '@domain/models/payment.model';
import { IPayment } from '@domain/usecases/payments';
import { MatPaginatorInterface } from '@shared/interfaces/mat-pagination-event.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent {}
