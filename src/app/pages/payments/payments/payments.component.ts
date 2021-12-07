import { PageRequest } from './../../../util/page-request';
import { ITask } from './../../../models/task/task';
import { PaymentService } from './../../../services/payment/payment.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/util/page';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { take } from 'rxjs/operators';

const ELEMENT_DATA: any[] = [
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 2, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 3, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 4, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 5, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 6, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 7, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 8, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 9, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 10, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 11, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 12, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 13, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 14, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 15, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 16, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 17, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 18, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 19, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 20, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 21, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
];

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

}
