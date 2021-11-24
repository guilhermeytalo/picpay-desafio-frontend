import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Account } from 'src/app/shared/models/account.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userLogged = new Subject<string>();
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(user: Account): void {
    this.getAccountServer().subscribe(res => {
      const account = res[0];
      if (res.length === 0) {
        this.userLogged.next('Erro na tentativa de login!');
      }
      else if ( account.email === user.email && account.password === user.password) {
        this.storeUser(account);
        this.userLogged.next('logged');
      } else {
        this.unstoreUser();
        this.userLogged.next('Usuário ou senha incorretos!');
      }
    });
  }

  public logout(): void {
    this.unstoreUser();
    this.router.navigate(['login']);
  }

  public userIsLogged(): boolean {
    const user = sessionStorage.getItem('currentUser');
    return user !== null;
  }

  public getUser(): Account {
    const sessionUser = sessionStorage.getItem('currentUser');
    let user = new Account();
    if (sessionUser) {
      user = JSON.parse(sessionUser);
    }
    return user;
  }

  private storeUser(user: Account): void {
    this.userIsLogged();
    const newUser = {
      name: user.name,
      email: user.email
    };
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  private unstoreUser(): void {
    sessionStorage.removeItem('currentUser');
  }

  private getAccountServer(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/account`)
    .pipe(
      first(),
      catchError(this.handleError<Account[]>('login', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
