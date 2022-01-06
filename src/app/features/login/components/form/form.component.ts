import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserRequest } from '../../models/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  isPasswordVisible: Boolean = false;
  passwordVisibleIcon: String = "assets/images/login/icons/visible-password.svg";
  passwordInvisibleIcon: String = "assets/images/login/icons/invisible-password.svg";

  loginForm!: FormGroup;

  @Output() authEvent: EventEmitter<AuthUserRequest> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
    });
  }

  changePasswordVisibillity(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    this.authEvent.emit(this.loginForm.getRawValue() as AuthUserRequest);
  }

  isInputInvalid(input: string): Boolean {
    const formInput = this.loginForm.get(input);
    return formInput?.errors && formInput?.touched;
  }

  isFormInvalid(): Boolean {
    return this.loginForm.invalid;
  }

}
