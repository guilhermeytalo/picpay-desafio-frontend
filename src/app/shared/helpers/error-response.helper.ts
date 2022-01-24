import { HttpErrorResponse } from '@angular/common/http';
import { errorHelperMessage } from './error-message.helper';

export default class ErrorResponseHelper {
  private _error: { code: string; message: string };
  private _status: number;

  constructor(code: string, status: number) {
    this._error = { code, message: errorHelperMessage(code) };
    this._status = status;
  }

  get error() {
    return new HttpErrorResponse({
      error: this._error,
      status: this._status,
      statusText: 'Bad Request'
    });
  }
}
