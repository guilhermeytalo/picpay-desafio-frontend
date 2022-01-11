import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
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

  public loginForm;
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

  ngOnInit(): void {
    this.loginService.checkLogin();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
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
