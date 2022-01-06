import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email = 'usuario@gmail.com';
  public password = 'usuario';
  public shouldShowPassword = false;
  private _loginRequestUrl = 'http://localhost:3000/account';

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}

  togglePassword(): void {
    this.shouldShowPassword = !this.shouldShowPassword;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
  ) {}

  async loginHandler() {
    const response = await fetch(this._loginRequestUrl);
    const data = await response.json();
    const wasLoginSuccess = this.checkUserCredentials(data);

    if (!wasLoginSuccess) {
      this.loginErrorHandler();
    };

    this.cookieService.set('is_logged_in', JSON.stringify(wasLoginSuccess));
    return wasLoginSuccess;
  }

  private checkUserCredentials(data) {
    const userFromEmail = data.find(user => user.email === this.email);

    if (!Boolean(userFromEmail)) {
      return false;
    };

    const isValidPassword = userFromEmail.password === this.password;
    return isValidPassword;
  }

  public loginErrorHandler() {
    this._snackBar.open('Credenciais incorretas.', 'ocultar', {
      duration: 2500,
    });
  }
}
