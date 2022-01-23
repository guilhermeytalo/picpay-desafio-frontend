import { Observable } from 'rxjs';
import { AccountModel } from '../models/account.model';

export type AuthenticationParams = {
  email: string;
  password: string;
};
export abstract class IAuthentication {
  abstract auth(params: AuthenticationParams): Observable<AccountModel>;
}
