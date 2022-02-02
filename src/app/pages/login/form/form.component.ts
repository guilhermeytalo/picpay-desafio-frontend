import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  public getErrorMessage(type: 'email' | 'password'): string {
    if (this.loginForm.get(type).hasError('required')) {
      return 'Você precisa digitar um valor!';
    }
    return `Campo invalido`;
  }

   public onSubmit() {
    const {email, password} = this.loginForm.value;

    if (this.loginForm.valid) {
      if (email !== 'usuario@gmail.com') {
        return;
      }

      if (password !== 'usuario') {
        return;
      }

      this.accountService
          .submitLogin(email, password)
          .subscribe(async value =>  {
            await this.router.navigateByUrl('/dashboard');
          }, error => {
            console.log(error);
          });
    } else {
      return;
    }
  }
}
