import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { ILocalStorage } from '../cache/interfaces/ilocalstorage';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(
    private readonly router: Router,
    private readonly storage: ILocalStorage
  ) {}

  canLoad(): boolean {
    const isUser = this.storage.checkIfExistsUser();
    if (!isUser) {
      this.router.navigate(['']);
    } else {
      return true;
    }
  }
}
