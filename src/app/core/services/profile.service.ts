import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, first, tap } from 'rxjs/operators';
import { UserAccount } from '../models/user-account.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '/account';
  constructor(private api: ApiService, private authService: AuthService) {}

  changeUserPassowrd(oldPassword: string, newPassword: string): Observable<UserAccount> {
    return this.authService.getUserData().pipe(
      first(),
      concatMap(data => this.authService.authenticate({ email: data.email, password: oldPassword })),
      concatMap(data =>
        this.api.patch(`${this.apiUrl}/${data.id}`, { password: newPassword }, { defaultErrorHandling: true, showLoading: true })
      ),
      concatMap(data => this.authService.authenticate({ email: data.email, password: newPassword }))
    );
  }

  changeUserInfo(userAccount: UserAccount): Observable<UserAccount> {
    return this.api
      .patch<UserAccount>(`${this.apiUrl}/${userAccount.id}`, userAccount, { defaultErrorHandling: true, showLoading: true })
      .pipe(tap(data => this.authService.updateUserData(data)));
  }
}
