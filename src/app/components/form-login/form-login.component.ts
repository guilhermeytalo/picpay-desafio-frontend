import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }
    return this.email.hasError('email') ? 'Não é um e-mail valido' : '';
  }

}
