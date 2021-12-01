import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, debounce, debounceTime, delay, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment.model';
import { PaymentService } from '../payment.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Row {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: number;
  formatedValue: string;
  date: string;
  formatedDate: string;
  time?: string;
  image: string;
  isPayed: boolean;
}


@Component({
  selector: 'app-payment-read',
  templateUrl: './payment-read.component.html',
  styleUrls: ['./payment-read.component.scss']
})
export class PaymentReadComponent implements OnInit, AfterViewInit {

  @Output() openUpdatePaymentDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  payments: Payment[];
  meses: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  displayedColumns: string[] = ['username', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource = new MatTableDataSource();

  nameFilter = new FormControl('');
  filterValues = {
    username: ''
  };


  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  constructor(
    private paymentService: PaymentService
  ) {
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.paymentService.UpdatedTable.subscribe(() => {
      this.updateTable();
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.updateTable();
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
    };
    return filterFunction;
  }

  updateTable(): void {
    merge(this.sort.sortChange, this.paginator.page, this.nameFilter.valueChanges)
    .pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.paymentService.read(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.nameFilter.value
        ).pipe(catchError(() => of(null)));
      }),
      delay(500),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        this.resultsLength = data.headers.get('X-Total-Count');

        data.body.map(res => {
          const date = new Date(res.date);
          const dataFormatada = `${date.getDate()} ${this.meses[(date.getMonth())]} ${date.getFullYear()}`;
          const time = date.toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric', hour12: true });
          res.formatedDate = dataFormatada;
          res.time = time;
          res.formatedValue = res.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        });

        return data;
      }),
    )
    .subscribe(data => {
      this.dataSource = data.body;
    });
  }

  updateTask(id: number): void {
    this.openUpdatePaymentDialog.emit(id);
  }

  deleteProduct(id: number): void {
    this.paymentService.delete(id).subscribe(() => {
      this.updateTable();
    });
  }

  toggleIspayed(row: Row): void {
    this.isLoadingResults = true;
    row.isPayed = !row.isPayed;
    delete row.formatedDate;
    delete row.formatedValue;
    this.paymentService.update(row).subscribe(() => {
      this.updateTable();
      this.isLoadingResults = false;
    });
  }

}
