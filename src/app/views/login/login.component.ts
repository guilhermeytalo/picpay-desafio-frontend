import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public email = 'usuario@gmail.com';
  public password = 'usuario';
  public shouldShowPassword = false;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}

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
