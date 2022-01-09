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
  private _paymentsUrl = 'http://localhost:3000/tasks';

  async getAll() {
    const response = await fetch(this._paymentsUrl);
    const data = await response.json();
    return data;
  }

  async remove(id) {
    await fetch(`${this._paymentsUrl}/${id}`, { method: 'DELETE' });
  }

  async add(payment) {
    const response = await fetch(this._paymentsUrl, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ ...payment }),
    });

    const data = await response.json();
    return data;
  }

  async getById(id) {
    const response = await fetch(`${this._paymentsUrl}/?id=${id}`);
    const data = await response.json();
    return data.length ? data[0] : undefined;
  }

  constructor() { }
}
