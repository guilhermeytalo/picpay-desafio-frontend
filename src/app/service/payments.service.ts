import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Payment } from "../models/payment"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class PaymentsApiService {
  url = "http://localhost:3000/tasks"

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.url)
  }

  createPayment(payment: Payment) {
    return this.http.post<Payment>(this.url, payment)
  }

  editElement(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.url}/${payment.id}`, payment)
  }

  getPaymentById(paymentId: number) {
    return this.http.get<Payment>(`${this.url}/${paymentId}`)
  }

  deletePayment(paymentId: number) {
    return this.http.delete(`${this.url}/${paymentId}`)
  }
}
