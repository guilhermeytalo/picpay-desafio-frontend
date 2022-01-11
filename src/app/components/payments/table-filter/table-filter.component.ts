import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  private _filterDialogSize = { width: '490px', height: '650px' };
  constructor(
    public dialog: MatDialog,
  ) { }

  filterStatus = false;
  emptyfilter = {
    filterStatus: this.filterStatus,
    filterObj: {},
  };

  startFilter = {}

  @Output() filterEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  resetFilter() {
    this.filterStatus = false;
    this.filterEvent.emit({
      filterStatus: this.filterStatus,
      filterObj: {},
    });
  }

  async openFilterDialog(): Promise<void> {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      ...this._filterDialogSize,
      data: {
        startFilter: this.startFilter,
      }
    });

    dialogRef.afterClosed().subscribe(filter => {
      if (!Boolean(filter)) {
        this.filterStatus = false;
        this.filterEvent.emit(this.emptyfilter);
        return;
      }

      this.startFilter = filter.filterObj;
      this.filterStatus = filter.filterStatus;
      this.filterEvent.emit(filter);
    });
  }

  getButtonClass() {
    return {
      'table-filter__button': true,
      'table-filter__button--active': this.filterStatus,
    };
  }

}
