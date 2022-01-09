import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Payment, PaymentsDetails, PaymentsHeaderItem, SortDirection } from '@/features/payments/models/payments.model';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    next: this.handleGetPaymentsSuccess.bind(this)
  };

  searchPaymentsByNameValue = '';
  searchedPaymentsByNameValue = '';

  constructor(private paymentsService: PaymentsService, private router: Router) { }

  ngOnInit(): void {
    this.paymentsSubscriptions.push(
      this.paymentsService.getDetails()
        .pipe(
          tap(this.handleGetPaymentsDetailsSuccess.bind(this)),
          switchMap(this.getPaymentsObservableFromPaymentsDetails.bind(this))
        ).subscribe(this.paymentsObserver)
    );
  }

  handleGetPaymentsDetailsSuccess(details: PaymentsDetails): void {
    this.paymentsDetails = details;
  }

  getPayments(pageNumber: number, pageSize: number): void {
    this.payments = [];

    if (!this.searchPaymentsByNameValue) {
      this.unsubscribePaymentsSubscritions();
      this.paymentsSubscriptions.push(this.getPaymentsObservable(pageNumber, pageSize).subscribe(this.paymentsObserver));
    } else {
      this.getPaymentsByName();
    }
  }

  getPaymentsObservable(pageNumber: number, pageSize: number): Observable<Payment[]> {
    return this.paymentsService.get(pageNumber, pageSize);
  }

  getPaymentsObservableFromPaymentsDetails(details: PaymentsDetails): Observable<Payment[]> {
    return this.getPaymentsObservable(details.pageNumberOptions[0], details.pageSizeOptions[0]);
  }

  handleGetPaymentsSuccess(payments: Payment[]) {
    this.payments = payments;
  }

  sortBy(item: PaymentsHeaderItem): void {
    this.payments.sort((first: Payment, second: Payment) => this.sort(first, second, item.value, this.getSortDirection(item)));
    this.handleSort(item);
  }

  getSortDirection(item: PaymentsHeaderItem): number {
    return this.sortIsAsc(item.sort) ? 1 : -1;
  }

  sort(first: Payment, second: Payment, sortBy: string, direction: number): number {
    return first[sortBy] > second[sortBy] ? direction : (direction * -1);
  }

  handleSort(item: PaymentsHeaderItem): void {
    item.sort = this.sortIsAsc(item.sort) ? 'desc' : 'asc';
  }

  sortIsAsc(value: SortDirection): boolean {
    return value === 'asc';
  }

  updatePageSize(pageSize: number): void {
    this.currentPageSize = pageSize;
    this.paymentsCount$ = this.paymentsService.getPaymentsPageCount(this.paymentsService.getAll(), this.currentPageSize);
    this.updatePageNumber(1);
  }

  updatePageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.getPayments(this.currentPageNumber, this.currentPageSize);
  }

  search() {
    if (this.searchPaymentsByNameValue !== this.searchedPaymentsByNameValue) {
      this.updatePageNumber(1);
    }
  }

  getPaymentsByName() {
    this.paymentsService.getAll()
      .pipe(
        map(this.filterPaymentsBySearchedName.bind(this)),
        tap(this.handleGetPaymentsFilteredByName.bind(this)),
        map(this.paginatePaymentsFilteredByName.bind(this))
      )
      .subscribe(this.paymentsObserver);
  }

  filterPaymentsBySearchedName(payments: Payment[]): Payment[] {
    return payments.filter(this.paymentContainsSearchedValue.bind(this));
  }

  handleGetPaymentsFilteredByName(filteredPayments: Payment[]): void {
    this.paymentsCount$ = this.paymentsService.getPaymentsPageCount(of(filteredPayments), this.currentPageSize);
    this.searchedPaymentsByNameValue = this.searchPaymentsByNameValue;
  }

  paginatePaymentsFilteredByName(payments: Payment[]): Payment[] {
    const paginationStart = (this.currentPageNumber - 1) * this.currentPageSize;
    const paginationEnd = paginationStart + this.currentPageSize;

    return payments.slice(paginationStart, paginationEnd);
  }

  paymentContainsSearchedValue(payment: Payment): boolean {
    return payment.name.toLowerCase().includes(this.searchPaymentsByNameValue.toLowerCase());
  }

  changeSearchValue() {
    if (this.searchedPaymentsByNameValue && !this.searchPaymentsByNameValue) {
      this.updatePageNumber(1);
    }
  }

  deletePayment(payment: Payment): void {
    this.paymentsService.delete(payment.id).subscribe({
      next: this.handleDeletePaymentSuccess.bind(this),
      error: this.navigateToLogin.bind(this)
    });
  }

  handleDeletePaymentSuccess(payment: Payment): void {
    this.payments.splice(this.payments.indexOf(payment), 1);
  }

  updatePayment(payment: Payment): void {
    this.paymentsService.update(payment).subscribe({
      next: this.handleUpdatePaymentSuccess.bind(this),
      error: this.navigateToLogin.bind(this)
    });
  }

  handleUpdatePaymentSuccess(payment: Payment): void {
    this.payments.splice(this.payments.indexOf(this.payments.find(p => p.id === payment.id)), 1, payment);
  }

  createPayment(payment: Payment): void {
    this.paymentsService.create(payment).subscribe({
      next: this.handleCreatePaymentSuccess.bind(this),
      error: this.navigateToLogin.bind(this)
    });
  }

  handleCreatePaymentSuccess(payment: Payment): void {
    this.payments.unshift(payment);
  }

  navigateToLogin(): void {
    this.router.navigate(['/']);
  }

  unsubscribePaymentsSubscritions(): void {
    this.paymentsSubscriptions.forEach(_ => _.unsubscribe());
  }

  ngOnDestroy() {
    this.unsubscribePaymentsSubscritions();
  }

}
