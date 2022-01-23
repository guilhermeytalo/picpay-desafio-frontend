import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpClient } from '@app/data/protocols/http-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientService implements IHttpClient {
  constructor(private readonly http: HttpClient) {}
  get<T, R>(url: string, params?: R): Observable<T> {
    return this.http.get<T>(url, params);
  }
}
