import { Component, OnInit } from '@angular/core';
import { AuthUserRequest } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor() { }

  auth(user: AuthUserRequest): void {
    console.log(user)
  }

}
