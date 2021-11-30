import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  read(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/tasks`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/tasks`, payment);
  }

  findUsernameLike(str): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/tasks?username_like=${str}`);
  }

  getPaymentByUsername(username: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/tasks?username=${username}`);
  }
}
