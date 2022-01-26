import { ModelInterface } from '../interfaces/model.interface';
import { Validators } from '@angular/forms';

export class AddPaymentModel implements ModelInterface {
  constructor(
    public name?: string,
    public username?: string,
    public value?: string,
    public date?: string,
    public title?: string,
    public image?: string
  ) {}

  getValidationRules() {
    return {
      username: [Validators.required],
      value: [Validators.required],
      date: [Validators.required],
      title: [Validators.required]
    };
  }
}
