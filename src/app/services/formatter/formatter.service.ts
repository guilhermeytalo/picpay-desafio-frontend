import { Injectable } from '@angular/core';
import * as moment from 'moment';

moment.locale('pt-br');

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  customDate(date) {
    return moment(date).format('DD MMM YYYY');
  }

  defaultDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  hourFromDate(date) {
    return moment(date).format('HH:mm A');
  }

  money(value) {
    return `R$ ${value}`.replace('.', ',')
  }

  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    const isNumberOrComma = charCode > 31 && (charCode < 43 || charCode > 57);
    return !isNumberOrComma
  }

  constructor() { }
}
