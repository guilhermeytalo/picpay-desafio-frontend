import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Payment } from '@/features/payments/models/payments.model';
import { PaymentsService } from '@/features/payments/services/payments.service';

interface TableHeaderItem {
  title: string;
  value: string;
  sort: 'asc' | 'desc';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  payments: Payment[];

  tableHeader: TableHeaderItem[];

  pageSizeOptions: number[];
  pageNumberOptions: number[];
  currentPageSize = 5;
  currentPageNumber = 0;
  paymentsSubscription: Subscription;

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.tableHeader = [
      {
        title: 'Usuário',
        value: 'name',
        sort: 'desc'
      },
      {
        title: 'Título',
        value: 'title',
        sort: 'desc'
      },
      {
        title: 'Data',
        value: 'date',
        sort: 'desc'
      },
      {
        title: 'Valor',
        value: 'value',
        sort: 'desc'
      },
      {
        title: 'Pago',
        value: 'isPayed',
        sort: 'desc'
      }
    ];

    this.pageSizeOptions = [5, 10, 15, 25, 50];
    this.pageNumberOptions = [1, 2, 3, 4, 5];

    this.getPayments(this.currentPageNumber, this.currentPageSize);
  }

  getPayments(pageNumber: number, pageSize: number): void {
    this.paymentsSubscription = this.paymentsService.get(pageNumber, pageSize).subscribe({
      next: this.handleGetPaymentsSuccess.bind(this),
      error: this.handleGetPaymentsError.bind(this)
    });
  }

  handleGetPaymentsSuccess(data: Payment[]) {
    this.payments = data;
  }

  handleGetPaymentsError(data: PaymentResponse) {
    console.log(data);
  }

  sortBy(item: TableHeaderItem): void {
    const direction = this.getSortDirection(item);
    this.payments.sort((first, second) => this.sort(first, second, item.value, direction));
    this.handleSort(item);
  }

  getSortDirection(item: TableHeaderItem): number {
    return this.sortIsAsc(item) ? 1 : -1;
  }

  sort(first, second, value, direction): number {
    return first[value] > second[value] ? direction : (direction * -1)
  }

  handleSort(item: TableHeaderItem): void {
    item.sort = this.sortIsAsc(item) ? 'desc' : 'asc';
  }

  sortIsAsc(item: TableHeaderItem): boolean {
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

  ngOnDestroy() {
    this.paymentsSubscription.unsubscribe();
  }

}
