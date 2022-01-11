import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public email = '';
  public password = '';
  public shouldShowPassword = false;

  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

  ngOnInit(): void {
    this.loginService.checkLogin();
  }

  togglePassword(): void {
    this.shouldShowPassword = !this.shouldShowPassword;
  }

  constructor(
    private loginService: LoginService,
  ) {}

  async loginHandler() {
    await this.loginService.login({
      email: this.email,
      password: this.password,
    });
  }
}
