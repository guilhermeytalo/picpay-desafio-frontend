import { Injectable } from '@angular/core';
import { AccountModel } from '@domain/models/account.model';
import {
  AuthenticationParams,
  IAuthentication
} from '@domain/usecases/authentication';
import { Observable } from 'rxjs';
import { IHttpClient } from '../protocols/http-client';

@Injectable()
export class AuthenticationService implements IAuthentication {
  constructor(private readonly http: IHttpClient) {}
  auth(params: AuthenticationParams): Observable<AccountModel[]> {
    return this.http.get(`url`, params);
  }
}
