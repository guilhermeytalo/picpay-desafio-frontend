import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpClient } from '@app/data/protocols/http-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientService implements IHttpClient {
  constructor(private readonly http: HttpClient) {}
  get<T>(url: string, params): Observable<any> {
    return this.http.get(url, params);
  }
}
