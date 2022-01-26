import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Payment } from "../models/payment"
import { BASE_URL } from "src/app/constants/global"

//Observable
import { Observable } from "rxjs"
import { map, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class PaymentsApiService {
  constructor(private http: HttpClient) {}

  getAllPayments(page: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/tasks/?_page=${page}&_limit=99`).pipe(tap(payments => payments))
  }

  savePayment(payment: Payment) {
    const paymentBody = {
      name: payment.name,
      title: payment.title,
      value: payment.value,
      date: payment.date,
    }

    if (payment.id) {
      return this.http.put<Payment>(`${BASE_URL}/tasks/${payment.id}`, paymentBody)
    } else {
      return this.http.post<Payment>(`${BASE_URL}/tasks`, paymentBody)
    }
  }

  getPaymentById(id: number) {
    return this.http.get<Payment>(`${BASE_URL}/tasks/${id}`)
  }

  deletePayment(id: string) {
    return this.http.delete(`${BASE_URL}/tasks/${id}`)
  }
}
