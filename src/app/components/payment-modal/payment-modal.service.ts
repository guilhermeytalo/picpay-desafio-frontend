import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Payments} from '../../../models/payments';

@Injectable({
    providedIn: 'root'
})
export class PaymentModalService {

    constructor() {
    }

    paymentFormData$: BehaviorSubject<Payments | any> = new BehaviorSubject<Payments | any>({});
    editPaymentFormData$: BehaviorSubject<{ payment: Payments, id: number } | any> = new BehaviorSubject<Payments | any>({});

    pubFormData(value: Payments) {
        this.paymentFormData$.next(value);
    }

    pubEditData(value: { payment: Payments, id: number }) {
        this.editPaymentFormData$.next(value);
    }

    subFormData(): Observable<Payments> {
        return this.paymentFormData$;
    }

    subEditData() {
        return this.editPaymentFormData$;
    }

}
