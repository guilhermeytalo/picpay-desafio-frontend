import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payments} from '../../models/payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  tasks = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Payments>(this.tasks);
  }
}
