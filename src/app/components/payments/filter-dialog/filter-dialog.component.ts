import { Component, OnInit, Inject } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider'
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {

  public filterObj = {
    isPayed: '',
    minValue: 0,
    maxValue: 1000,
    startDate: '1970-01-01',
    endDate: moment().format("YYYY-MM-DD"),
  };

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { startFilter }
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.startFilter).length) {
      this.filterObj = this.startFilter
    }
  }

  get startFilter() {
    const { startFilter } = this.data;
    return Boolean(startFilter) ? startFilter : {};
  }

  onNoClick(): void {
    const endDate = moment(this.filterObj.endDate).format("YYYY-MM-DD");
    const startDate = moment(this.filterObj.startDate).format("YYYY-MM-DD");

    this.dialogRef.close({ filterStatus: true, filterObj: {
      ...this.filterObj,
        endDate,
        startDate,
    }});
  }

  onSaveClick(): void {
    const endDate = moment(this.filterObj.endDate).format("YYYY-MM-DD");
    const startDate = moment(this.filterObj.startDate).format("YYYY-MM-DD");

    this.dialogRef.close({
      filterStatus: true,
      filterObj: {
        ...this.filterObj,
        endDate,
        startDate,
      },
    });
  }

  onResetClick(): void {
    this.filterObj = {
      isPayed: '',
      endDate: '',
      startDate: '',
      minValue: 0,
      maxValue: 2000,
    }

    this.dialogRef.close({ filterStatus: false, filterObj: {} });
  }

  foods = [
    { value: '', viewValue: 'Todos' },
    { value: 'true', viewValue: 'Pagos' },
    { value: 'false', viewValue: 'Não Pagos' },
  ];

  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number): string => {
      return `R$ ${value}`;
    }
  }
}
