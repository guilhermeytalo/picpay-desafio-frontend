import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Md5 } from 'ts-md5/dist/md5';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private _loginRequestUrl = 'http://localhost:3000/account';

  constructor(
    private _router: Router,
    private _cookieService: CookieService,
    private _feedbackService: FeedbackService,
  ) {}

  async login(userLogin) {
    const response = await fetch(this._loginRequestUrl);
    const data = await response.json();

    const wasLoginSuccess = this.checkUserCredentials(data, userLogin);

    if (!wasLoginSuccess) {
      this.loginErrorHandler();
      return;
    };

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
    this._feedbackService.showMessage('Credenciais incorretas.');
  }

  public checkLogin(currentPage = '/payments') {
    const sessionId = this._cookieService.get('user-session-id');
    const isLoggedIn = Boolean(sessionId);

    !isLoggedIn && this._router.navigate(['/login']);
    isLoggedIn && this._router.navigate([currentPage]);
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
