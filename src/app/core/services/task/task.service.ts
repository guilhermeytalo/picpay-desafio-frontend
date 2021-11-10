import { Ipayment } from './../../../shared/models/ipayment';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public url_api = `${API}/tasks`

  constructor(
    private http: HttpClient
  ) { }

  get(query: HttpParams): Observable<HttpResponse<Ipayment[]>> {
    return this.http.get<Ipayment[]>(
      `${this.url_api}`, {params: query, observe: 'response' }
    );
    // return this.http.get<Ipayment[]>(
    //   `${this.url_api}?_limit=${limit}&_page=${page}&name_like=${search}`, 
    //   {observe: 'response'}
    // );
  }

  post(payment: Ipayment): Observable<Ipayment> {
    return this.http.post<Ipayment>(`${this.url_api}`, payment);
  }

  put(payment: Ipayment): Observable<Ipayment> {
    return this.http.put<Ipayment>(`${this.url_api}/${payment.id}`, payment);
  }

  delete(id: number): Observable<Ipayment> {
    return this.http.delete<Ipayment>(`${this.url_api}/${id}`);
  }
}
