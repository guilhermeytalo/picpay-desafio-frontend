import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Payment, PaymentsDetails, PaymentsHeaderItem, SortDirection } from '@/features/payments/models/payments.model';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  payments: Payment[];
  paymentsDetails: PaymentsDetails;
  currentPageSize = 5;
  currentPageNumber = 0;
  paymentsSubscriptions: Subscription[] = [];
  paymentsObserver = {
    next: this.handleGetPaymentsSuccess.bind(this),
    error: this.handleGetPaymentsError.bind(this)
  };

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentsSubscriptions.push(
      this.paymentsService.getDetails()
        .pipe(
          switchMap((data) => {
            this.paymentsDetails = data;
            // this.paymentsDetails = null;
            return this.getPaymentsObservable(data.pageNumberOptions[0], data.pageSizeOptions[0]);
          })
        ).subscribe(this.paymentsObserver)
    );
  }

  getPayments(pageNumber: number, pageSize: number): void {
    this.unsubscribePaymentsSubscritions();
    this.paymentsSubscriptions.push(this.getPaymentsObservable(pageNumber, pageSize).subscribe(this.paymentsObserver));
  }

  getPaymentsObservable(pageNumber: number, pageSize: number): Observable<Payment[]> {
    return this.paymentsService.get(pageNumber, pageSize);
  }

  handleGetPaymentsSuccess(data: Payment[]) {
    this.payments = data;
  }

  handleGetPaymentsError(error: any) {
    console.log(error);
  }

  sortBy(item: PaymentsHeaderItem): void {
    const direction = this.getSortDirection(item);
    this.payments.sort((first, second) => this.sort(first, second, item.value, direction));
    this.handleSort(item);
  }

  getSortDirection(item: PaymentsHeaderItem): number {
    return this.sortIsAsc(item) ? 1 : -1;
  }

  sort(first: Payment, second: Payment, value: string, direction: number): number {
    return first[value] > second[value] ? direction : (direction * -1);
  }

  handleSort(item: PaymentsHeaderItem): void {
    item.sort = this.sortIsAsc(item) ? 'desc' : 'asc';
  }

  sortIsAsc(item: PaymentsHeaderItem): boolean {
    return item.sort === 'asc';
  }

  updatePageSize(value: number): void {
    this.currentPageSize = value;
    this.getPayments(this.currentPageNumber, this.currentPageSize);
  }

  updatePageNumber(value: number): void {
    this.currentPageNumber = value;
    this.getPayments(this.currentPageNumber, this.currentPageSize);
  }

  unsubscribePaymentsSubscritions(): void {
    this.paymentsSubscriptions.forEach(_ => _.unsubscribe());
  }

  ngOnDestroy() {
    this.unsubscribePaymentsSubscritions();
  }

}
