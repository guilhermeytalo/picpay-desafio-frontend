import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  constructor() { }

  @Input()
  public name;

  @Input()
  public order = 0;

  ngOnInit(): void {}

  getClass() {
    return {
      'table-header': true,
      'table-header--asc': this.order === 1,
      'table-header--desc': this.order === -1,
    }
  }

}
