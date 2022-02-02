import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payments} from '../../models/payments';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    tasks = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient) {
    }

    getTasks() {
        return this.http.get<Payments>(this.tasks);
    }

    getTaskById(id: number) {
        return this.http.get<Payments>(`${this.tasks}/${id}`);
    }

    createPaymentData(data: Payments) {
        return this.http.post(this.tasks, data);
    }

    deleteTask(id: number) {
        return this.http.delete<Payments>(`${this.tasks}/${id}`);
    }

    editTaskById(id: number, data: Payments) {
        return this.http.put<Payments>(`${this.tasks}/${id}`, data);
    }
}
