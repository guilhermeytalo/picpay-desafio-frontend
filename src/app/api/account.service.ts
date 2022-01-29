import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loginRoute = 'http://localhost:3000/account';
  constructor(private http: HttpClient) { }


  submitLogin(email: string, password: string) {
    return this.http.post<Login>(this.loginRoute, {email, password});
  }
}
