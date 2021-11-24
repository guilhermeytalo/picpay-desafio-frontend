import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '@app/core/models/user-account.model';
import { AuthService } from '@app/core/services/auth.service';
import { ProfileService } from '@app/core/services/profile.service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { DialogConfirmationComponent } from '@app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData = this.authService.getUserData().pipe(tap(data => this.formInfo.patchValue(data)));

  formInfo = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required])
  });

  formPassword = new FormGroup({
    old: new FormControl(null, [Validators.required]),
    new: new FormControl(null, [Validators.required]),
    confirm: new FormControl(null, [Validators.required])
  });
  constructor(private authService: AuthService, private profileService: ProfileService, private snackbar: SnackbarService) {}

  changePassword() {
    if (this.formPassword.valid && this.formPassword.value.new === this.formPassword.value.confirm) {
      let data = this.formPassword.value;
      DialogConfirmationComponent.open({ title: 'Confirma a alteração da senha?', message: '' })
        .afterClosed()
        .pipe(
          filter(result => !!result),
          mergeMap(() => this.profileService.changeUserPassowrd(data.old, data.new))
        )
        .subscribe(
          () => {
            this.snackbar.showSuccess('Senha alterada com sucesso!');
            this.formPassword.reset();
          },
          err => {
            if (err.status) {
              this.snackbar.showError('Senha anterior não é valida.');
            } else {
              this.snackbar.showError('Ocorreu um erro ao alterar a senha.');
            }
          }
        );
    } else {
      this.snackbar.showError('Senhas não conferem.');
    }
  }

  changeUserInfo() {
    if (this.formInfo.valid) {
      DialogConfirmationComponent.open({ title: 'Confirma a alteração das informações?', message: '' })
        .afterClosed()
        .pipe(
          filter(result => !!result),
          mergeMap(() => this.authService.getUserData()),
          first(),
          map(data => ({ ...data, ...this.formInfo.value })),
          mergeMap((data: UserAccount) => this.profileService.changeUserInfo(data))
        )
        .subscribe(() => this.snackbar.showSuccess('Informações atualizadas com sucesso!'));
    }
  }
}
