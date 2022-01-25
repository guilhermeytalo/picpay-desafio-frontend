import { Component, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent {
  public checked = { check: false, id: 0 };
  public direction = 'ASC';
  public orderBy = 'id';
  public lastOrderBy = 'id';
  public elementData = [
    {
      id: 1,
      name: 'Pennie Dumphries',
      title: 'Hydrogen',
      date: 1.0079,
      value: 19.96,
      isPayed: true
    },
    {
      id: 2,
      name: 'Pennie Dumphries',
      title: 'Hydrogen',
      date: 1.0079,
      value: 19.96,
      isPayed: true
    }
  ];
  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'isPayed',
    'actions'
  ];
  dataSource = new MatTableDataSource(this.elementData);
  constructor() {}

  public sortTable(option) {
    if (this.direction === 'ASC' && this.lastOrderBy === option) {
      this.direction = 'DESC';
    } else {
      this.direction = 'ASC';
    }
    this.orderBy = option;
    this.lastOrderBy = option;
  }

  public onSelect(event: MatCheckboxChange, id: number) {
    this.checked.check = event.checked;
    this.checked.id = id;
  }
}
