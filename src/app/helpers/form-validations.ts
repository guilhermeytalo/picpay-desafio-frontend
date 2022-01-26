import { FormGroup, FormArray } from "@angular/forms"

export function verificaValidacoesForm(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls).forEach(campo => {
    const controle = formGroup.get(campo)
    controle.markAsDirty()
    controle.markAsTouched()

    if (controle instanceof FormGroup || controle instanceof FormArray) {
      this.verificaValidacoesForm(controle)
    }
  })
}

export function resetar() {
  this.loginForm.reset()
}

export class FormErrorMessages {
  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      pattern: "Campo inválido",
      email: `${fieldName} inválido`,
    }

    return config[validatorName]
  }
}
