import { DeletePaymentComponent } from './../delete-payment/delete-payment.component';
import { EditPaymentComponent } from './../edit-payment/edit-payment.component';
import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { PageRequest } from './../../../util/page-request';
import { ITask } from './../../../models/task/task';
import { PaymentService } from './../../../services/payment/payment.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/util/page';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  displayedColumns: string[] = ['image', 'name', 'username', 'title', 'value', 'date', 'isPayed', 'actions'];

  page: Page<ITask> = new Page([], 0);
  pageEvent!: PageEvent;
  sortEvent!: Sort;


  tasks: ITask[] = [];

  constructor(
    private _paymentService: PaymentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarItens();
  }

  listarItens() {
    // this.carregando = true;
    const queryAdicional = new Map();
    // if (this.formGroupPesquisa.value.nome) {
    //     queryAdicional.set("nome_like", this.formGroupPesquisa.value.nome);
    // }
    this._paymentService
        .listar(
            new PageRequest(
                {
                    pageNumber: this.pageEvent ? this.pageEvent.pageIndex : 0,
                    pageSize: this.pageEvent ? this.pageEvent.pageSize : 10,
                },
                {
                    property: this.sortEvent ? this.sortEvent.active : "id",
                    direction: this.sortEvent ? this.sortEvent.direction : "desc",
                },
                queryAdicional
            )
        )
        .pipe(take(1))
        .subscribe(
            (page) => {
                this.page = page;
                //this.carregando = false;
            },
            (error) => {
                this.page = new Page([], 0);
                //this.carregando = false;
                // this.matSnackBar.open("Erro ao listar itens", null, {
                //     duration: 5000,
                //     panelClass: "red-snackbar",
                // });
            }
        );
    }

    //open dialog add
    openDialogAdd(){
      this.dialog.open(AddPaymentComponent, { width: '600px', data: { title: 'Adicionar Pagamento' } })
        .afterClosed().subscribe(response => {
          console.log('Fechando modal');
        })
    }

     //open dialog edit
     openDialogEdit(){
      this.dialog.open(EditPaymentComponent, { width: '600px', data: { title: 'Editando Pagamento' } })
        .afterClosed().subscribe(response => {
          console.log('Fechando modal');
        })
    }

    //open dialog delete
    openDialogDelete(){
      this.dialog.open(DeletePaymentComponent, { width: '400px', data: { title: 'Excluindo Pagamento' } })
        .afterClosed().subscribe(response => {
          console.log('Fechando modal');
        })
    }

}
