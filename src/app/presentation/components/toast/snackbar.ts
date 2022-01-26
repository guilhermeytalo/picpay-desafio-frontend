import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBar } from '@app/shared/interfaces/isnackbar';
import { translate } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class SnackBarService implements ISnackBar {
  constructor(private readonly _snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: 'error' | 'success' | 'info'): void {
    this._snackBar.open(translate(message), 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: `snack-${type}`
    });
  }
}
