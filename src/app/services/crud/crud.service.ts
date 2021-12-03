import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private _httpCliente: HttpClient
  ) { }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    console.log('Cheguei aqui Crud Service', `${environment.BASE_URL}/${endpoint}`);
    return this._httpCliente.get<T>(`${environment.BASE_URL}/${endpoint}`, {
      params
    });
  }

  post<T>(endpoint: string, body: T): Observable<void> {
    return this._httpCliente.post<void>(`${environment.BASE_URL}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: T): Observable<void> {
    return this._httpCliente.put<void>(`${environment.BASE_URL}/${endpoint}`, body);
  }

  patch<T>(endpoint: string, body: T): Observable<T> {
    return this._httpCliente.patch<T>(`${environment.BASE_URL}/${endpoint}`, body);
  }

  delete(endpoint: string): Observable<void> {
    return this._httpCliente.delete<void>(`${environment.BASE_URL}/${endpoint}`);
  }
}
