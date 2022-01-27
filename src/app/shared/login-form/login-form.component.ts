import { Router } from "@angular/router"
import { AuthService } from "../../service/auth.service"
import { ToastService } from "../../service/toast.service"
import { Component, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { first } from "rxjs/operators"
import { FormGroup } from "@angular/forms"
import { verificaValidacoesForm } from "src/app/helpers/form-validations"
@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  loading = false
  users = []
  loginForm: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public toastService: ToastService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.toastService.clear()
      this.loading = true

      this.authService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          () => {
            this.toastService.success("Autenticado com sucesso!")
            this.router.navigate(["/"])
            this.loading = false
          },
          error => {
            this.toastService.error(error)
            this.loading = false
          }
        )
    } else {
      verificaValidacoesForm(this.loginForm)
    }
  }
}
