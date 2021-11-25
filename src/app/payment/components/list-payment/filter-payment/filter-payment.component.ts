import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentTaskFilter } from '@app/payment/models/payment-task-filter.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-payment',
  templateUrl: './filter-payment.component.html',
  styleUrls: ['./filter-payment.component.scss']
})
export class FilterPaymentComponent {
  showFilter = false;

  @Input() filter: PaymentTaskFilter = {};
  @Output() filterChange: EventEmitter<PaymentTaskFilter> = new EventEmitter<PaymentTaskFilter>();

  form = new FormGroup({
    name_like: new FormControl(null),
    username_like: new FormControl(null),
    title_like: new FormControl(null),
    value_gte: new FormControl(null),
    value_lte: new FormControl(null),
    date_gte: new FormControl(null),
    date_lte: new FormControl(null),
    isPayed: new FormControl(false)
  });
  destroySubscriber: Subject<void> = new Subject();

  constructor() {}

  filterPayment() {
    this.filterChange.emit(this.formWithoutNull());
    this.showFilter = false;
  }

  clearFilter() {
    this.form.reset();
    this.filterChange.emit(this.formWithoutNull());
    this.showFilter = false;
  }

  closeFilter() {
    this.showFilter = false;
    this.form.reset();
    this.form.patchValue(this.filter);
  }

  castAny = (e: any) => e as any;

  private formWithoutNull() {
    let formValue = this.form.value;
    Object.keys(formValue).forEach(k => {
      if (formValue[k] instanceof moment) {
        formValue[k] = formValue[k].toISOString();
      }
      if (!formValue[k]) {
        delete formValue[k];
      }
    });
    return formValue;
  }
}
