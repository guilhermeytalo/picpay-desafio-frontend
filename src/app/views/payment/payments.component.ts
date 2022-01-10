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
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource: MatTableDataSource<PaymentData>;
  paginatorLength = 0;
  currentPage = 0;

  private _openDialogSize = { width: '772px', height: '395px' };
  private _removeDialogSize = { width: '405px', height: '325px' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.paginator.page.subscribe(res => {
      this.paginate({ index: res.pageIndex, limit: res.pageSize });
      this.currentPage = res.pageIndex;
    });
  }

  async ngOnInit() {
    this.paginate({ index: 0 });
  }

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private paymentsService: PaymentsService,
    public formatterService: FormatterService,
    private _MatPaginatorIntl: MatPaginatorIntl,
  ) {
    this.loginService.checkLogin();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por página:';
  }

  async paginate({ index, limit = 5 }){
    const currentPage = index + 1;
    
    const payments = await this.paymentsService.getPayments({
      page: currentPage,
      limit: limit,
      query: '',
      sort: 'id',
      order: 'asc'
    });

    this.paginatorLength = Number(payments.total);
    this.dataSource = new MatTableDataSource(payments.data);
  }

  openAddDialog(settings: any = {}): void {
    const { edit, payment } = settings;
    const data = { isEditing: Boolean(edit), payment };

    const dialogRef = this.dialog.open(PaymentsAddComponent, {
      data,
      ...this._openDialogSize,
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateTableData(newData) {
    this.dataSource.data = newData;
    this.dataSource._updateChangeSubscription();
  }

  async removeDataTable(paymentToRemove) {
    await this.paymentsService.remove(paymentToRemove.id);
    this.paginate({ index: this.currentPage });
  }

  async addDataTable(payment) {
    await this.paymentsService.add(payment);
    this.paginate({ index: this.currentPage });
  }

  async editDataTable(payment) {
    await this.paymentsService.update(payment);
    this.paginate({ index: this.currentPage });
  }
}