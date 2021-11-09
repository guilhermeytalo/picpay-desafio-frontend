import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

import { TaskService } from '@services/task.service';

import { Task } from '@models/task.model';

import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { PaymentDeleteDialogComponent } from './components/dialogs/payment-delete-dialog/payment-delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  dataSource: Task[];

  displayedColumns: string[];

  isLoadingTasks: boolean;

  isLoadingTaskDelete: { [key: number]: boolean };

  isLoadingTaskUpdate: { [key: number]: boolean };

  tasksLength: number;

  private unsubscribeAll$: Subject<any>;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('paginator') paginator: PaginatorComponent;

  @ViewChild('searchFilter') searchFilter: SearchFilterComponent;

  constructor(
    private taskService: TaskService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) {
    this.setDefaults();
  }

  ngAfterViewInit(): void {
    this.sortChange();
    this.retrieveTasks();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  retrieveTasks(): void {
    this.isLoadingTasks = true;

    this.taskService
      .retrieveTasks(
        this.sort.active,
        this.sort.direction,
        this.paginator.page,
        this.paginator.pageSize,
        this.searchFilter.filters,
      )
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingTasks = false;
        }),
      )
      .subscribe(
        (response: HttpResponse<Task[]>) => {
          this.dataSource = response?.body;
          this.tasksLength = +response.headers.get('X-Total-Count');
        },
        () => {
          this.toastrService.error('Erro ao buscar pagamentos');
        },
      );
  }

  updatePayment(id: number, isPaid: boolean): void {
    this.isLoadingTaskUpdate[id] = true;

    const index = this.dataSource.findIndex((data) => data.id === id);
    const payment = this.dataSource[index];

    this.taskService
      .updateTask(id, { isPayed: !isPaid })
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingTaskUpdate[id] = false;
        }),
      )
      .subscribe(
        () => {
          payment.isPayed = !isPaid;
          this.toastrService.success('Pagamento atualizado com sucesso.');
        },
        () => {
          payment.isPayed = isPaid;
          this.toastrService.error('Erro ao atualizar pagamento.');
        },
      );
  }

  deletePayment(id: number): void {
    this.isLoadingTaskDelete[id] = true;

    this.taskService
      .deleteTask(id)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingTaskDelete[id] = false;
        }),
      )
      .subscribe(
        () => {
          this.toastrService.success('Pagamento deletado com sucesso.');
          this.retrieveTasks();
        },
        () => {
          this.toastrService.error('Erro ao deletar pagamento.');
        },
      );
  }

  openPaymentDeleteDialog(paymentId: number, payment: Task): void {
    const dialogConfig = new MatDialogConfig();

    const user = `Usuário: ${payment.name}`;
    const date = `Data: ${this.datePipe.transform(payment.date, 'dd/MM/yyyy')}`;
    const value = `Valor: ${this.currencyPipe.transform(payment.value)}`;

    dialogConfig.data = {
      message: 'Certeza que deseja excluir pagamento?',
      data: `${user}</br>${date}</br>${value}`,
      actions: {
        no: 'CANCELAR',
        yes: `EXCLUIR`,
      },
    };

    this.dialog
      .open(PaymentDeleteDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((response) => {
        if (response) {
          this.deletePayment(paymentId);
        }
      });
  }

  private sortChange(): void {
    this.sort.sortChange.subscribe(() => {
      this.paginator.page = 1;
      this.retrieveTasks();
    });
  }

  private setDefaults(): void {
    this.displayedColumns = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
    this.isLoadingTasks = false;
    this.isLoadingTaskDelete = {};
    this.isLoadingTaskUpdate = {};

    this.unsubscribeAll$ = new Subject();
  }
}
