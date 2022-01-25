import { Observable } from 'rxjs';
import { PaymentModel } from '../models/payment.model';

export abstract class IPayment {
  abstract get(
    params?: string
  ): Observable<{ totalCount: number; user: PaymentModel[] }>;
}
