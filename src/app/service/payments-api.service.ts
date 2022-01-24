import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Payment } from "../models/payment"

//Observable
import { Observable } from "rxjs"
import { map, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class PaymentsApiService {
  private url: string = `http://localhost:3000`

  constructor(private http: HttpClient) {}

  getAllPayments(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/tasks/?_page=${page}&_limit=200`).pipe(tap(payments => payments))
  }

  savePayment(payment: Payment) {
    const paymentBody = {
      name: payment.name,
      title: payment.title,
      value: payment.value,
      date: payment.date,
    }

    if (payment.id) {
      return this.http.put<Payment>(`${this.url}/tasks/${payment.id}`, paymentBody)
    } else {
      return this.http.post<Payment>(`${this.url}/tasks`, paymentBody)
    }
  }

  getPaymentById(id: number) {
    return this.http.get<Payment>(`${this.url}/tasks/${id}`)
  }

  deletePayment(id: string) {
    return this.http.delete(`${this.url}/tasks/${id}`)
  }
}
