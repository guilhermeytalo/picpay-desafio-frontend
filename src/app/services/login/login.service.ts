import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private _loginRequestUrl = 'http://localhost:3000/account';
  private _user: any = {};

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _cookieService: CookieService,
  ) {}

  async login(userLogin) {
    const response = await fetch(this._loginRequestUrl);
    const data = await response.json();

    const wasLoginSuccess = this.checkUserCredentials(data, userLogin);

    if (!wasLoginSuccess) {
      this.loginErrorHandler();
      return;
    };

    this._user = userLogin;
    const sessionId = this.hasher(`${userLogin.email}${userLogin.password}`);
    this._cookieService.set('user-session-id', String(sessionId));

    this._router.navigate(['/payments']);
    return wasLoginSuccess;
  }

  hasher(value) {
    const md5 = new Md5();
    return md5.appendStr(value).end();
  }

  async logout() {
    this._cookieService.delete('user-session-id');
    this._router.navigate(['/login']);
  }

  public loginErrorHandler() {
    this._snackBar.open('Credenciais incorretas.', 'ocultar', {
      duration: 2500,
    });
  }

  public checkLogin() {
    const sessionId = this._cookieService.get('user-session-id');
    const isLoggedIn = Boolean(sessionId);

    !isLoggedIn && this._router.navigate(['/login']);
    isLoggedIn && this._router.navigate(['/payments']);
  }

  private checkUserCredentials(data, userLogin) {
    const userFromEmail = data.find(user => userLogin.email === user.email);

    if (!Boolean(userFromEmail)) {
      return false;
    };

    const isValidPassword = userFromEmail.password === userLogin.password;
    return isValidPassword;
  }
}
