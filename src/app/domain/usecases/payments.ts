import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

export abstract class IPayment {
  abstract get(url: string, params?: string): Observable<Payment[]>;
}
