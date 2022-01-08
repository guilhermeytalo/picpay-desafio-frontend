import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { API_URL } from 'src/_config/constants';
import { paymentsDetailsMock } from 'src/_mock/payments-details.mock';
import { Payment, PaymentsDetails } from '../models/payments.model';

@Injectable()
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }

  get(pageNumber = 0, pageSize = 5): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${API_URL}/tasks?_page=${pageNumber}&_limit=${pageSize}`).pipe(delay(500));
  }

  getDetails(): Observable<PaymentsDetails> {
    return of(paymentsDetailsMock).pipe(delay(1000));
  }

  getPaymentsPageCount(observable: Observable<Payment[]>, pageSize = 0): Observable<number> {
    return observable.pipe(map((data: Payment[]) => Math.ceil(data.length / pageSize)));
  }

  getAll(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${API_URL}/tasks`);
  }
}
