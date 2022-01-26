import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _observerCreatePayment = new BehaviorSubject(null);
  constructor() {}

  notify() {
    this._observerCreatePayment.next(true);
  }
  get observerNotification(): Observable<boolean> {
    return this._observerCreatePayment.asObservable();
  }
}
