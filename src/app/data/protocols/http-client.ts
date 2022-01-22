import { Observable } from 'rxjs';

export abstract class IHttpClient {
  abstract get<T, R>(url: string, params: R): Observable<T>;
}
