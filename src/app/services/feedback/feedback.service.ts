import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  public showMessage(message) {
    this._snackBar.open(message, 'ocultar', {
      duration: 2500,
    });
  }
}
