import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthUserRequest } from '../models/login.model';

@Injectable()
export class LoginService {

  constructor() { }

  public auth(user: AuthUserRequest): Observable<Boolean> {
    return of(true);
  }
}
