import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isPasswordVisible: Boolean = false;

  passwordVisibleIcon: String = "assets/images/login/icons/visible-password.svg";
  passwordInvisibleIcon: String = "assets/images/login/icons/invisible-password.svg";

  constructor() { }

  ngOnInit(): void {
  }

  changePasswordVisibillity(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
