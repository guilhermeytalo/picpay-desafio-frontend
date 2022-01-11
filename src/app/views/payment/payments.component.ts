import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { PaymentsService } from '../../services/payments/payments.service';
import { FormatterService } from '../../services/formatter/formatter.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PaymentsAddComponent } from '../../components/payments/payments-add/payments-add.component';
import { PaymentsRemoveComponent } from '../../components/payments/payments-remove/payments-remove.component';

export interface PaymentData {
  date: string,
  id: number,
  image: string,
  isPayed: true,
  name: string,
  title: string,
  username: string,
  value: number,
}
@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  orderByColumns = { name: 0, title: 0, date: 0, value: 0, isPayed: 0 };
  dataSource: MatTableDataSource<PaymentData>;

  public pageSettings = { 
    length: 0,
    page: 0, 
    sort: 'id',
    order: 'asc',
    query: '',
    limit: 5,
  };

  public filterStatus = false;
  public customQuery = false;
  private _addDialogSize = { width: '772px', height: '395px' };
  private _removeDialogSize = { width: '405px', height: '325px' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.paginator.page.subscribe(res => {
      this.pageSettings.page = res.pageIndex;
      this.pageSettings.limit = res.pageSize;
      this.paginate({ index: res.pageIndex, limit: res.pageSize });
    });
  }

  async ngOnInit() {
    this.paginate();
  }

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private paymentsService: PaymentsService,
    public formatterService: FormatterService,
    private _MatPaginatorIntl: MatPaginatorIntl,
  ) {
    this.loginService.checkLogin();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Exibir:';
  }

  async paginate(settings: any = {}) {
    const {
      sort = this.pageSettings.sort,
      page = this.pageSettings.page,
      limit = this.pageSettings.limit,
      query = this.pageSettings.query,
      order = this.pageSettings.order,
      customQuery = this.customQuery,
    } = settings;

    const pageParams = { page, limit, query, sort, order };
    const payments = await this.paymentsService.getPayments(pageParams, customQuery);
    
    this.customQuery = customQuery;
    this.pageSettings.length = Number(payments.total);
    this.dataSource = new MatTableDataSource(payments.data);
  }

  setFilter(filter) {
    const { filterObj, filterStatus } = filter;
    const { startDate, endDate, isPayed, minValue, maxValue } = filterObj;

    this.filterStatus = filterStatus;

    if (!filterStatus) {
      this.customQuery = false;
      this.paginate();
      return;
    }

    const customQuery = { 
      date_lte: endDate,
      date_gte: startDate,
      value_gte: minValue,
      value_lte: maxValue,
      isPayed_like: String(isPayed),
    }

    this.paginate({ customQuery });
  }

  changeOrder(column) {
    const currentOrder = this.orderByColumns[column];
    const newOrder = currentOrder === 1
      ? -1
      : currentOrder + 1;

    Object.keys(this.orderByColumns).forEach(columnName => {
      this.orderByColumns[columnName] = columnName === column
        ? newOrder
        : 0;
    })

    const orderBy = { '-1': 'desc', '1': 'asc', '0': '' }[newOrder];

    this.pageSettings.sort = column;
    this.pageSettings.order = orderBy;
    this.paginate();
  }

  openAddDialog(settings: any = {}): void {
    const { edit, payment } = settings;
    const data = { isEditing: Boolean(edit), payment };

    const dialogRef = this.dialog.open(PaymentsAddComponent, {
      data,
      ...this._addDialogSize,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (!Boolean(result)) return;
      if (edit) this.editDataTable(result);
      else this.addDataTable(result);
    });
  }

  async openRemoveDialog(id): Promise<void> {
    const paymentToRemove = await this.paymentsService.getById(id);
    const data = { payment: paymentToRemove };

    const dialogRef = this.dialog.open(PaymentsRemoveComponent, {
      data,
      ...this._removeDialogSize,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!Boolean(result)) return;
      this.removeDataTable(result);
    });
  }

  changeValue($event, { payment }) {
    const paymentIndex = this.dataSource.data
      .findIndex(paymentRef => payment.id === paymentRef.id);

    const newPayment = this.dataSource.data[paymentIndex];
    newPayment.isPayed = $event.checked;
    this.editDataTable(newPayment);
  }

  applyFilter(event: Event) {
    this.pageSettings.query = (event.target as HTMLInputElement).value;
    this.paginate();
  }

  updateTableData(newData) {
    this.dataSource.data = newData;
    this.dataSource._updateChangeSubscription();
  }

  async removeDataTable(paymentToRemove) {
    await this.paymentsService.remove(paymentToRemove.id);
    this.paginate();
  }

  async addDataTable(payment) {
    await this.paymentsService.add(payment);
    this.paginate();
  }

  async editDataTable(payment) {
    await this.paymentsService.update(payment);
    this.paginate();
  }
}