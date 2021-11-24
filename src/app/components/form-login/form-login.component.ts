import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Account } from 'src/app/shared/models/account.model';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  hide = true;
  error: string;

  formLogin = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });

  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

  constructor(
    public fb: FormBuilder,
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userLogged.subscribe(res => {
      res !== 'logged' ? this.error = res : this.router.navigate(['meus-pagamentos']);
    });
  }

  onSubmit(): void {
    if (this.formLogin.valid) {

      const user: Account = {
        email: this.email.value,
        password: this.password.value
      };

      this.authService.login(user);
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }
    return this.email.hasError('email') ? 'Não é um e-mail valido' : '';
  }

}
