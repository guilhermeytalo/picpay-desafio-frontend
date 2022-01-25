import { OnInit, Directive } from "@angular/core"
import { FormGroup, FormArray } from "@angular/forms"
import { AlertService } from "../../service/alert.service"

@Directive()
export abstract class BaseFormComponent implements OnInit {
  loginForm: FormGroup
  alertService: AlertService

  constructor() {}

  ngOnInit() {}

  abstract submit()

  onSubmit() {
    if (this.loginForm.valid) {
      this.submit()
    } else {
      this.alertService.error("Credenciais inválidas")
      setTimeout(() => {
        this.alertService.clear()
      }, 5000)
      this.verificaValidacoesForm(this.loginForm)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log("✅ ~ campo", campo)

      const controle = formGroup.get(campo)
      controle.markAsDirty()
      controle.markAsTouched()
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle)
      }
    })
  }

  verificaValidTouched(campo: string) {
    return !this.loginForm.get(campo).valid && (this.loginForm.get(campo).touched || this.loginForm.get(campo).dirty)
  }

  verificaRequired(campo: string) {
    return (
      this.loginForm.get(campo).hasError("required") &&
      (this.loginForm.get(campo).touched || this.loginForm.get(campo).dirty)
    )
  }

  verificaEmailInvalido() {
    const campoEmail = this.loginForm.get("email")
    if (campoEmail.errors) {
      return campoEmail.errors["email"] && campoEmail.touched
    }
  }

  aplicaCssErro(campo: string) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "has-feedback": this.verificaValidTouched(campo),
    }
  }

  resetar() {
    this.loginForm.reset()
  }
}
