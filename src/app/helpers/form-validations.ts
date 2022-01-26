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

export function verificaValidTouched(campo: string) {
  return !this.loginForm.get(campo).valid && (this.loginForm.get(campo).touched || this.loginForm.get(campo).dirty)
}

export function verificaRequired(campo: string) {
  return (
    this.loginForm.get(campo).hasError("required") &&
    (this.loginForm.get(campo).touched || this.loginForm.get(campo).dirty)
  )
}

export function verificaEmailInvalido() {
  const campoEmail = this.loginForm.get("email")
  if (campoEmail.errors) {
    return campoEmail.errors["email"] && campoEmail.touched
  }
}

export function aplicaCssErro(campo: string) {
  return {
    "has-error": this.verificaValidTouched(campo),
    "has-feedback": this.verificaValidTouched(campo),
  }
}

export function resetar() {
  this.loginForm.reset()
}
