import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  displayedColumns: string[] = ['id', 'image', 'name', 'username', 'title', 'value', 'date', 'isPayed', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
