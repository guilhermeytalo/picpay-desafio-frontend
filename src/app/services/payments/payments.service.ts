import { Injectable } from '@angular/core';

export interface PaymentData {
  date: string,
  id: number,
  image: string,
  isPayed: true,
  name: string,
  title: string,
  username: string,
  value: number,
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private _paymentsUrl =  'http://localhost:3000/tasks';

  async getAll() {
    const response = await fetch(this._paymentsUrl);
    const data = await response.json();
    return data;
  }

  constructor() { }
}
