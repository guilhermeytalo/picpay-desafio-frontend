import { Injectable } from '@angular/core';
import { IHttpClient } from '@app/data/protocols/http-client';
import { PaymentsPostParams } from '@app/domain/models/payment-params.model';
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
    let url = `${Routes.payment}`;
    if (params) {
      url = `${Routes.payment}?${params}`;
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
  addPayment(params: PaymentsPostParams): Observable<void> {
    return this.http.post(Routes.payment, params);
  }
  editPayment(id: number, params: PaymentsPostParams): Observable<void> {
    return this.http.put(Routes.paymentPerId(id), params);
  }
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(Routes.paymentPerId(id));
  }
}
