import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = `${environment.baseUrl}/tasks`;

  constructor(
    private http: HttpClient
  ) { }

  read(sort: string, order: SortDirection, page: number, limit: number): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>(`${this.baseUrl}?_sort=${sort}&_order=${order}&_page=${page + 1}&_limit=${limit + 1}`, { observe: 'response' });
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}`, payment);
  }

  delete(id: number): Observable<Payment> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Payment>(url);
  }

  findUsernameLike(str): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}?username_like=${str}`);
  }

  getPaymentByUsername(username: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}?username=${username}`);
  }
}
