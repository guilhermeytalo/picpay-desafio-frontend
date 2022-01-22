import { Observable } from 'rxjs';

export abstract class IHttpClient {
  abstract post<T, R>(url: string, params: R): Observable<T>;
}
