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
    const userIsLogged = this.authService.userIsLogged();

    if (userIsLogged) {
      this.router.navigate(['meus-pagamentos']);
      return false;
    }

    return true;
  }
}
