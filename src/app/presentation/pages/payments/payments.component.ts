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
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.elementData);
  constructor() {}

  sortTable(option) {
    console.log(option);
    // console.log(this.direction);
    // console.log(this.lastOrderBy);

    if (this.direction === 'ASC' && this.lastOrderBy === option) {
      this.direction = 'DESC';
      console.log(`dasdasdas`);
    } else {
      this.direction = 'ASC';
    }
    this.orderBy = option;
    this.lastOrderBy = option;
  }
}
