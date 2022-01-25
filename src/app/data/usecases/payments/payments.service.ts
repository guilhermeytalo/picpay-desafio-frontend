import { Injectable } from '@angular/core';
import { IHttpClient } from '@app/data/protocols/http-client';
import { Payment } from '@app/domain/models/payment.model';
import { IPayment } from '@app/domain/usecases/payments';
import { Routes } from '@app/shared/helpers/router-helper';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsService implements IPayment {
  constructor(private readonly http: IHttpClient) {}
  get(params?: string): Observable<Payment[]> {
    let url = `${Routes.getTasks}`;

    if (params) {
      url = `${Routes.getTasks}?${params}`;
    }

    return this.http.get(url);
  }
}
