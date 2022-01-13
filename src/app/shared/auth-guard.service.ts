import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public tokenService: TokenStorageService, public router: Router) {}

  canActivate(): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
