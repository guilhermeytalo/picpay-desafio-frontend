import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Payments} from '../../../models/payments';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentModalService {
  url = 'http://localhost:3000/tasks';

  constructor(
      private http: HttpClient,
  ) { }

  paymentFormData$: BehaviorSubject<Payments | any> = new BehaviorSubject<Payments | any>({});

  pubFormData(value: Payments) {
    this.paymentFormData$.next(value);
  }

  subFormData(): Observable<Payments> {
    return this.paymentFormData$;
  }

  createPaymentData(data: Payments) {
    return this.http.post(this.url, data);
  }

}
