import { Component, OnInit } from '@angular/core';

interface TableHeaderItem {
  title: string;
  value: string;
  sort: 'asc' | 'desc';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentPage: any = [{
    "id": 1,
    "name": "Pennie Dumphries",
    "username": "pdumphries0",
    "title": "Dental Hygienist",
    "value": 19.96,
    "date": "2020-07-21T05:53:20Z",
    "image": "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
    "isPayed": true
  },
  {
    "id": 2,
    "name": "Foster Orthmann",
    "username": "forthmann1",
    "title": "Professor",
    "value": 207.36,
    "date": "2021-01-28T14:01:29Z",
    "image": "https://robohash.org/quasetqui.png?size=150x150&set=set1",
    "isPayed": true
  },
  {
    "id": 3,
    "name": "Crissie Summerill",
    "username": "csummerill2",
    "title": "VP Product Management",
    "value": 464.54,
    "date": "2020-02-09T18:20:32Z",
    "image": "https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1",
    "isPayed": false
  },
  {
    "id": 4,
    "name": "Letitia Crolly",
    "username": "lcrolly3",
    "title": "Web Developer I",
    "value": 183.58,
    "date": "2021-07-10T20:39:48Z",
    "image": "https://robohash.org/estveniamet.png?size=150x150&set=set1",
    "isPayed": false
  },
  {
    "id": 5,
    "name": "Anthea Pundy",
    "username": "apundy4",
    "title": "Software Engineer III",
    "value": 177.19,
    "date": "2021-01-01T14:09:51Z",
    "image": "https://robohash.org/quiaautomnis.png?size=150x150&set=set1",
    "isPayed": true
  }];

  tableHeader: TableHeaderItem[];

  pageSizeOptions: string[];
  pageNumberOptions: number[];
  currentPageSize = '5';

  constructor() { }

  ngOnInit(): void {
    this.tableHeader = [
      {
        title: 'Usuário',
        value: 'name',
        sort: 'asc'
      },
      {
        title: 'Título',
        value: 'title',
        sort: 'asc'
      },
      {
        title: 'Data',
        value: 'date',
        sort: 'asc'
      },
      {
        title: 'Valor',
        value: 'value',
        sort: 'asc'
      },
      {
        title: 'Pago',
        value: 'isPayed',
        sort: 'asc'
      }
    ];

    this.pageSizeOptions = [5, 10, 15, 25, 50].map(_ => _ + '');
    this.pageNumberOptions = [1, 2, 3, 4, 5];
  }

  sortBy(item: TableHeaderItem): void {
    const direction = this.getSortDirection(item);
    this.currentPage.sort((first, second) => this.sort(first, second, item.value, direction));
    this.handleSort(item);
  }

  getSortDirection(item: TableHeaderItem): number {
    return this.sortIsAsc(item) ? 1 : -1;
  }

  sort(first, second, value, direction): number {
    return first[value] > second[value] ? direction : (direction * -1)
  }

  handleSort(item: TableHeaderItem): void {
    item.sort = this.sortIsAsc(item) ? 'desc' : 'asc';
  }

  sortIsAsc(item: TableHeaderItem): boolean {
    return item.sort === 'asc';
  }

  log(value: any): void {
    console.log(value);
  }

}
