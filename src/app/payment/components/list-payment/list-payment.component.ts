import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetPaymentTaskParams } from '@app/payment/models/get-payment-task-params.model';
import { PaymentTaskFilter } from '@app/payment/models/payment-task-filter.model';
import { PaymentTask } from '@app/payment/models/payment-task.model';
import { PaymentTaskService } from '@app/payment/services/payment-task.service';
import { of, Subject, timer } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DialogAddPaymentComponent } from '../dialog-add-payment/dialog-add-payment.component';

@Component({
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  list: PaymentTask[] = [];
  listTotal = 0;
  listParams: GetPaymentTaskParams = {
    _page: 1,
    _limit: 10,
    _sort: ['name'],
    _order: 'asc'
  };

  filterPayment: PaymentTaskFilter = {};

  updateListSubject: Subject<void> = new Subject();
  destroySubscriber: Subject<void> = new Subject();
  textSearchControl = new FormControl();
  constructor(private paymentTaskService: PaymentTaskService) {}

  ngOnInit(): void {
    this.subscribeToUpdateList();
    this.updateList();
    this.subscribeTextSearch();
  }

  ngOnDestroy(): void {
    this.destroySubscriber.next();
    this.destroySubscriber.complete();
  }

  sort(event: MatSort) {
    this.listParams._sort = [event.active];
    this.listParams._order = event.direction;
    this.updateList();
  }

  page(event: PageEvent) {
    if (this.listParams._limit != event.pageSize || this.listParams._page != event.pageIndex + 1) {
      this.listParams._limit = event.pageSize;
      this.listParams._page = event.pageIndex + 1;
      this.updateList();
    }
  }

  subscribeToUpdateList(): void {
    this.updateListSubject.pipe(debounceTime(100), takeUntil(this.destroySubscriber)).subscribe(() => this.getList());
  }

  getList(): void {
    this.paymentTaskService.getPaymentTaskList({ ...this.listParams, ...this.filterPayment }).subscribe(resp => {
      this.list = resp.list;
      this.listTotal = resp.total;
      if (this.listParams._page === 1) {
        setTimeout(() => {
          this.paginator?.firstPage();
          this.paginator?.page.next({ pageSize: this.listParams._limit, pageIndex: this.listParams._page - 1, length: this.listTotal });
        });
      }
    });
  }

  updateList(): void {
    this.updateListSubject.next();
  }

  subscribeTextSearch(): void {
    this.textSearchControl.valueChanges
      .pipe(
        debounce(text => (text ? timer(300) : of())),
        distinctUntilChanged(),
        takeUntil(this.destroySubscriber)
      )
      .subscribe(text => {
        this.listParams.q = text;
        this.listParams._page = 1;
        this.updateList();
      });
  }

  showDialogAddPaymentTask() {
    DialogAddPaymentComponent.open()
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => this.updateList());
  }
}
