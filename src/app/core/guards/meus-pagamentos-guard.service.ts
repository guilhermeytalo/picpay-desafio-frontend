import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MeusPagamentosGuardService {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canLoad(): boolean {
    const userIsLogged = this.authService.userIsLogged();

    if (!userIsLogged) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
