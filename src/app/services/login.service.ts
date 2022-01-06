import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private _loginRequestUrl = 'http://localhost:3000/account';

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _cookieService: CookieService,
  ) {}

  async login(userLogin) {
    const response = await fetch(this._loginRequestUrl);
    const data = await response.json();
    const wasLoginSuccess = this.checkUserCredentials(data, userLogin);
    this._cookieService.set('is_logged_in', JSON.stringify(wasLoginSuccess));
    
    if (!wasLoginSuccess) {
      this.loginErrorHandler();
      return;
    };

    this._router.navigate(['/payments']);
    return wasLoginSuccess;
  }

  async logout() {
    this._cookieService.set('is_logged_in', 'false');
    this._router.navigate(['/login']);
  }

  public loginErrorHandler() {
    this._snackBar.open('Credenciais incorretas.', 'ocultar', {
      duration: 2500,
    });
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
