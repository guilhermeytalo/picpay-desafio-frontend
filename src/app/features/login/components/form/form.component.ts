import { UserAuthRequest } from '@/features/auth/models/user-auth.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  isPasswordVisible = false;
  passwordVisibleIcon = 'assets/images/login/icons/visible-password.svg';
  passwordInvisibleIcon = 'assets/images/login/icons/invisible-password.svg';

  loginForm!: FormGroup;

  @Output() authEvent: EventEmitter<UserAuthRequest> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changePasswordVisibillity(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    this.authEvent.emit(this.loginForm.getRawValue() as UserAuthRequest);
  }

  isInputInvalid(input: string): boolean {
    const formInput = this.loginForm.get(input);
    return formInput?.errors && formInput?.touched;
  }

  isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

}
