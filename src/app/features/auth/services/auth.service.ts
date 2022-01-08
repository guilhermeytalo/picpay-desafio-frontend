import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthRequest } from '@/features/auth/models/user-auth.model';
import { tap } from 'rxjs/operators';
import { API_URL, STORAGE_TOKEN_KEY } from 'src/_config/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  auth(userAuth: UserAuthRequest): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/auth/login`, userAuth, { observe: 'response' })
      .pipe(
        tap(res => {
          this.setToken(res.body.access_token);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(STORAGE_TOKEN_KEY) ?? '';
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
