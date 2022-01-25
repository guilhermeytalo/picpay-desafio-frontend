/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-filter-table',
  templateUrl: 'filter-table.component.html',
  styleUrls: ['filter-table.component.scss']
})
export class FilterTableComponent {
  @Output() name: EventEmitter<{ name_like: NgModel }> = new EventEmitter<{
    name_like: NgModel;
  }>();
  public text: NgModel;

  onClick() {
    this.name.emit({ name_like: this.text });
  }
}
