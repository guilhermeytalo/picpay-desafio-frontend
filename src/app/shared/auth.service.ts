import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get(AUTH_API + '/account', {params});
  }
}