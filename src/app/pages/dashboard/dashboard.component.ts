import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Payments} from '../../../models/payments';
import {PaymentService} from '../../api/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {PaymentModalComponent} from '../../components/payment-modal/payment-modal.component';
import {PaymentModalService} from '../../components/payment-modal/payment-modal.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  data: Payments[] = [];
  dataSource;
  booleanAsc = false;
  profileImg = '../../../assets/img.png';

  paymentForm: Payments;

  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'payment',
  ];

  constructor(
      private liveAnnouncer: LiveAnnouncer,
      private paymentService: PaymentService,
      public dialog: MatDialog,
      private paymentModalService: PaymentModalService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  primaryColor = '#007DFE';

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Exibir';
  }

  getData() {
    this.paymentService
        .getTasks()
        .subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.data = res;
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

  addPayment() {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '772px',
      height: '395px',
      data: {payments: this.paymentForm},
    });

    dialogRef.afterClosed()
        .pipe(
            mergeMap(v => this.paymentModalService.subFormData()),
            mergeMap((p: Payments) => this.paymentModalService.createPaymentData(p)))
        .subscribe(result => {
        console.log('The dialog was closed', result);
    });
  }
}
