import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Payment, PaymentsDetails, PaymentsHeaderItem, SortDirection } from '@/features/payments/models/payments.model';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { map, switchMap, tap } from 'rxjs/operators';

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
  paymentsCount$ = this.paymentsService.getPaymentsPageCount(this.paymentsService.getAll(), this.currentPageSize);
  paymentsObserver = {
    next: this.handleGetPaymentsSuccess.bind(this),
    error: this.handleGetPaymentsError.bind(this)
  };

  searchPaymentsByNameValue = '';
  searchedPaymentsByNameValue = '';

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentsSubscriptions.push(
      this.paymentsService.getDetails()
        .pipe(
          switchMap((data) => {
            this.paymentsDetails = data;
            return this.getPaymentsObservable(data.pageNumberOptions[0], data.pageSizeOptions[0]);
          })
        ).subscribe(this.paymentsObserver)
    );
  }

  getPayments(pageNumber: number, pageSize: number): void {
    this.payments = [];
    if (this.searchPaymentsByNameValue === '') {
      this.unsubscribePaymentsSubscritions();
      this.paymentsSubscriptions.push(this.getPaymentsObservable(pageNumber, pageSize).subscribe(this.paymentsObserver));
    } else {
      this.getPaymentsByName();
    }
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
    this.paymentsCount$ = this.paymentsService.getPaymentsPageCount(this.paymentsService.getAll(), value);
    this.updatePageNumber(1);
  }

  updatePageNumber(value: number): void {
    this.currentPageNumber = value;
    this.getPayments(this.currentPageNumber, this.currentPageSize);
  }

  unsubscribePaymentsSubscritions(): void {
    this.paymentsSubscriptions.forEach(_ => _.unsubscribe());
  }

  search() {
    if (this.searchPaymentsByNameValue !== this.searchedPaymentsByNameValue) {
      this.updatePageNumber(1);
    }
  }

  getPaymentsByName() {
    const paginationStart = (this.currentPageNumber - 1) * this.currentPageSize;
    const paginationEnd = ((this.currentPageNumber - 1) * this.currentPageSize) + this.currentPageSize;

    this.paymentsService.getAll()
      .pipe(
        map((data: Payment[]) => data.filter(this.contains.bind(this))),
        tap((data: Payment[]) => {
          this.paymentsCount$ = this.paymentsService.getPaymentsPageCount(of(data), this.currentPageSize);
          this.searchedPaymentsByNameValue = this.searchPaymentsByNameValue;
          console.log(data);
        }),
        map((data: Payment[]) => data.slice(paginationStart, paginationEnd))
      )
      .subscribe(this.paymentsObserver);
  }

  contains(payment: Payment): boolean {
    return payment.name.toLowerCase().includes(this.searchPaymentsByNameValue.toLowerCase());
  }

  ngOnDestroy() {
    this.unsubscribePaymentsSubscritions();
  }

}
