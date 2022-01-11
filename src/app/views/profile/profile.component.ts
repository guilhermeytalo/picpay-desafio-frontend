import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.checkLogin('/profile');
  }

}
