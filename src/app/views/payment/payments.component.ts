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

  private _openDialogSize = { width: '772px', height: '395px' };
  private _removeDialogSize = { width: '405px', height: '325px' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    const payments = await this.paymentsService.getAll();
    this.dataSource = new MatTableDataSource(payments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      if (!result) return;
      this.removeDataTable(result);
    });
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

  removeDataTable(paymentToRemove) {
    const newData = this.dataSource.data
      .filter(payment => payment.id !== paymentToRemove.id);
      this.updateTableData(newData);
  }

  async addDataTable(payment) {
    const newPayment = await this.paymentsService.add(payment);
    this.updateTableData([newPayment, ...this.dataSource.data]);
  }

  async editDataTable(payment) {
    const paymentIndex = this.dataSource.data
      .findIndex(paymentRef => payment.id === paymentRef.id);

    await this.paymentsService.update(payment);
    this.dataSource.data[paymentIndex] = payment;
    this.updateTableData(this.dataSource.data);
  }
}