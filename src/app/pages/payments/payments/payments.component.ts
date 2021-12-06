import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
  {id: 1, name: 'Jose Francisco', image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1', username: '@jose', title: 'Title', value: 2.900, date: '01 jun, 2020', isPayed: true},
];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'image', 'name', 'username', 'title', 'value', 'date', 'isPayed', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
