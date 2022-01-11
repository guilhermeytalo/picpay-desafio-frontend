import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private loginService: LoginService,
  ) { }

  logout() {
    this.loginService.logout();
  }

  goTo(page) {
    this._router.navigate([page]);
  }

  ngOnInit(): void {}

}
