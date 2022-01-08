import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/_config/constants';
import { Payment, PaymentsResponse } from '../models/payments.model';

@Injectable()
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }

  get(pageNumber = 0, pageSize = 5): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${API_URL}/tasks?_page=${pageNumber}&_limit=${pageSize}`);
  }
}
