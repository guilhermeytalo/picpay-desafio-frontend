import {
  HttpClient,
  HttpHeaderResponse,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpClient } from '@app/data/protocols/http-client';
import {
  AccountModel,
  TotalCountModel
} from '@app/domain/models/account.model';
import { PaymentModel } from '@app/domain/models/payment.model';
import { IPayment } from '@app/domain/usecases/payments';
import { Routes } from '@app/shared/helpers/router-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaymentsService implements IPayment {
  constructor(private readonly http: IHttpClient) {}

  get(
    params?: string
  ): Observable<{ totalCount: number; user: PaymentModel[] }> {
    let url = `${Routes.getTasks}`;
    if (params) {
      url = `${Routes.getTasks}?${params}`;
    }
    return this.http
      .get<PaymentModel[]>(url, {
        observe: 'response'
      })
      .pipe(
        map((resp) => {
          const totalCount = parseInt(resp.headers?.get('X-Total-Count'), 10);
          return {
            totalCount,
            user: resp.body
          };
        })
      );
  }
}
