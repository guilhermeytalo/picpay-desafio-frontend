import { Component, SkipSelf } from '@angular/core';
import { IAuthentication } from '@app/domain/usecases/authentication';
import { ISnackBar } from '@app/shared/class/isnackbar';
import { CredentialModel } from '@app/shared/forms-model/credential.model';
import { FormHelper } from '@shared/helpers/form.helper';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent extends FormHelper {
  private _loading = false;
  constructor(
    @SkipSelf() private readonly authenticationService: IAuthentication,
    @SkipSelf() private readonly snackBar: ISnackBar
  ) {
    super(new CredentialModel());
  }

  auth() {
    this._loading = true;
    this.authenticationService.auth(this.form.value).subscribe((res) => {
      this._loading = false;
      if (res) {
        console.log(res);
      } else {
        this.snackBar.openSnackBar('message.error', 'error');
      }
    });
  }
  get loading(): boolean {
    return this._loading;
  }
}
