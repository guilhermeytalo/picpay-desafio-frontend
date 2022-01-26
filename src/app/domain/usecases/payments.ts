import { Observable } from 'rxjs';
import { PaymentsPostParams } from '../models/payment-params.model';
import { PaymentModel } from '../models/payment.model';

export abstract class IPayment {
  abstract get(
    params?: string
  ): Observable<{ totalCount: number; user: PaymentModel[] }>;

  abstract addPayment(params: PaymentsPostParams): Observable<void>;
  abstract editPayment(
    id: number,
    params: PaymentsPostParams
  ): Observable<void>;
}
