import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  canLoad(): boolean {
    if (this.authService.userIsLogged()) {
      this.router.navigate(['meus-pagamentos']);
      return false;
    } else {
      return true;
    }
  }
}
