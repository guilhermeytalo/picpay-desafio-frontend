import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Payments} from '../../../models/payments';
import {PaymentService} from '../../api/payment.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  data: Payments[] = [];
  dataSource;
  booleanAsc = false;

  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'payment',
  ];

  constructor(
      private liveAnnouncer: LiveAnnouncer,
      private paymentService: PaymentService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  primaryColor = '#007DFE';

  ngOnInit() {


    this.getData();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Exibir';
    //
    // console.log(this.dataSource.sort);
  }

  getData() {
    this.paymentService
        .getTasks()
        .subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortPayment(event: Sort) {
    if (event.active === 'payment') {
      this.dataSource.filteredData = this.dataSource
          .filteredData
          .sort((a: Payments, b: Payments) => compareBool(a.isPayed, b.isPayed, event.direction === 'asc'));
      function compareBool(a: boolean, b: boolean, isAsc: boolean) {
        return a === b ? 0 : isAsc ? (a ? -1 : 1) : a ? 1 : -1;
      }
    }
  }
}
