import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserAccount } from '../models/user-account.model';
import { ApiService } from './api.service';

interface UserAuthentication {
  email: string;
  password: string;
}

const TOKEN_KEY = 'token_key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/account';
  private userData: BehaviorSubject<UserAccount> = new BehaviorSubject(null);
  private authenticated = false;

  constructor(private api: ApiService, private router: Router) {}

  authenticate(authentication: UserAuthentication): Observable<UserAccount> {
    return this.api
      .get<UserAccount[]>(this.apiUrl, authentication, {
        defaultErrorHandling: false,
        showLoading: false
      })
      .pipe(
        map((user: UserAccount[]) => {
          if (!!user?.length) {
            sessionStorage.setItem(TOKEN_KEY, btoa(JSON.stringify(user[0])));
            this.authenticated = true;
            this.userData.next(user[0]);
            return user[0];
          }
          throw new HttpErrorResponse({ status: 404, error: 'Email ou senha incorretos' });
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    let token = sessionStorage.getItem(TOKEN_KEY);
    if (!this.authenticated && !!token) {
      this.authenticated = !!token;
      this.userData.next(JSON.parse(atob(token)));
    }
    return of(this.authenticated).pipe(
      mergeMap(() => this.getUserData()),
      map(userData => !!userData)
    );
  }

  getUserData = (): Observable<UserAccount> => this.userData.asObservable();
  updateUserData(userAccount): void {
    this.userData.next(userAccount);
    sessionStorage.setItem(TOKEN_KEY, btoa(JSON.stringify(userAccount)));
  }

  logout() {
    this.userData.next(null);
    sessionStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
