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
  private _headers = {
    "Content-type": "application/json; charset=UTF-8"
  };

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
      headers: this._headers,
      body: JSON.stringify({ ...payment }),
    });

    const data = await response.json();
    return data;
  }

  async update(payment) {
    const response = await fetch(`${this._paymentsUrl}/${payment.id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({ ...payment }),
    });

    const data = await response.json();
    return data;
  }

  async getPayments(settings, customQuery: any | object = false) {
    const { page, limit, query, sort, order } = settings;

    const defaultParams = new URLSearchParams({
      _page: Boolean(query) ? '' : page + 1,
      _limit: limit,
      _sort: sort,
      _order: order,
      q: query,
    });

    const customParams = new URLSearchParams(customQuery);
    const url = `${this._paymentsUrl}/?${defaultParams}&${customParams}`;

    const response = await fetch(url, {
      headers: this._headers,
    });

    const data = await response.json();

    return {
      data,
      total: response.headers.get('X-Total-Count'),
    }
  }


  async getById(id) {
    const response = await fetch(`${this._paymentsUrl}/?id=${id}`);
    const data = await response.json();
    return data.length ? data[0] : undefined;
  }

  constructor() { }
}
