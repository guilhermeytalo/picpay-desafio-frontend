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
export class PaymentsComponent implements OnInit {
  public checked = { check: false, id: 0 };
  public direction = 'ASC';
  public orderBy = 'id';
  public lastOrderBy = 'id';
  public currentPage = 0;
  public totalCount: number;

  public filter: any;
  public filterName: any;
  public pagination = { _page: this.currentPage, _limit: 5 };

  public displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'isPayed',
    'actions'
  ];
  public dataSource;
  private _loading = true;

  constructor(@SkipSelf() private readonly paymentService: IPayment) {}
  ngOnInit(): void {
    this.getPayments();
  }

  public getPayments() {
    this._loading = true;
    console.log(this.prepareRequest());
    this.paymentService
      .get(this.prepareRequest())
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe((list: { totalCount: number; user: PaymentModel[] }) => {
        this.dataSource = new MatTableDataSource(list.user);
        this.totalCount = list.totalCount;
        console.log(list);
      });
  }

  public sortTable(option) {
    if (this.direction === 'ASC' && this.lastOrderBy === option) {
      this.direction = 'DESC';
    } else {
      this.direction = 'ASC';
    }
    this.orderBy = option;
    this.lastOrderBy = option;
    this.getPayments();
  }

  public onSelect(event: MatCheckboxChange, id: number) {
    this.checked.check = event.checked;
    this.checked.id = id;
  }

  public setPagination(page: MatPaginatorInterface) {
    this.pagination._page = page.pageIndex;
    this.pagination._limit = page.pageSize;
    this.getPayments();
  }
  public setFilterName(nameFilter: string) {
    this.filterName = nameFilter;
    this.getPayments();
  }
  private prepareRequest() {
    const obj = {
      ...(this.filter === undefined ? '' : this.filter),
      ...this.pagination,
      _sort: this.orderBy,
      _order: this.direction,
      ...(this.filterName === undefined ? '' : this.filterName)
    };
    console.log(obj);
    return new URLSearchParams(obj)
      .toString()
      .replace(/%3A/g, ':')
      .replace(/%2C/g, ',');
  }

  get loading() {
    return this._loading;
  }
}
