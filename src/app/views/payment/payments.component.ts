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
    const { edit } = settings;
    this.dialog.open(PaymentsAddComponent, {
      width: '772px',
      height: '395px',
      data: { isEditing: Boolean(edit) },
    });
  }

  async openRemoveDialog(id): Promise<void> {
    const paymentToRemove = await this.paymentsService.getById(id);

    const dialogRef = this.dialog.open(PaymentsRemoveComponent, {
      width: '405px',
      height: '325px',
      data: { payment: paymentToRemove },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const newData = this.dataSource.data
      .filter(payment => payment.id !== paymentToRemove.id);

      this.dataSource.data = newData;
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}