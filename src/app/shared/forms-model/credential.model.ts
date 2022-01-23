import { ModelInterface } from '../interfaces/model.interface';
import { Validators } from '@angular/forms';

export class CredentialModel implements ModelInterface {
  constructor(public email?: string, public password?: string) {}

  getValidationRules() {
    return {
      email: [Validators.required, Validators.email],
      password: [Validators.required]
    };
  }
}
