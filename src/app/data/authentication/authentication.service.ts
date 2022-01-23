import { Injectable } from '@angular/core';
import { Routes } from '@shared/helpers/router-helper';
import { AccountModel } from '@domain/models/account.model';
import {
  AuthenticationParams,
  IAuthentication
} from '@domain/usecases/authentication';
import { Observable, of, throwError } from 'rxjs';
import { IHttpClient } from '../protocols/http-client';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService implements IAuthentication {
  constructor(private readonly http: IHttpClient) {}
  auth(params: AuthenticationParams): Observable<AccountModel> {
    return this.http
      .get<AccountModel[], AuthenticationParams>(Routes.getUser, params)
      .pipe(
        map((users) =>
          users.find(
            (user) =>
              user.email === params.email && user.password === params.password
          )
        )
      );
  }
}
