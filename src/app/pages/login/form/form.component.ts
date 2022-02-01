import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AccountService} from '../../../api/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  loginForm: FormGroup;
  hide = true;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private router: Router
  )
  {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.nullValidator]],
    });
  }

  getErrorMessage(type: 'email' | 'password') {
    if (this.loginForm.get(type).hasError('required')) {
      return 'Você precisa digitar um valor!';
    }
    return `Campo invalido`;
  }

   onSubmit() {
    console.log(this.loginForm.value);
    const {email, password} = this.loginForm.value;

    if (this.loginForm.valid) {
      console.log('form submitted');
      if (email !== 'usuario@gmail.com') {
        return;
      }

      if (password !== 'usuario') {
        return;
      }

      this.accountService
          .submitLogin(email, password)
          .subscribe(async value =>  {
            console.log(value);
            await this.router.navigateByUrl('/dashboard');
          }, error => {
            console.log(error);
          });
    } else {
      return;
    }
  }
}
