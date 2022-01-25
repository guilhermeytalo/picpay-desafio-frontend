/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss']
})
export class PaymentsComponent {
  public direction = 'ASC';
  public orderBy = 'id';
  public lastOrderBy = 'id';
  public elementData = [
    {
      id: 1,
      name: 'Pennie Dumphries',
      title: 'Hydrogen',
      date: 1.0079,
      value: 'H',
      isPayed: true
    },
    {
      id: 1,
      name: 'Pennie Dumphries',
      title: 'Hydrogen',
      date: 1.0079,
      value: 'H',
      isPayed: true
    }
  ];
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed'];
  dataSource = new MatTableDataSource(this.elementData);
  constructor() {}

  sortTable(option) {
    if (this.direction === 'ASC' && this.lastOrderBy === option) {
      this.direction = 'DESC';
    } else {
      this.direction = 'ASC';
    }
    this.orderBy = option;
    this.lastOrderBy = option;
  }
}
