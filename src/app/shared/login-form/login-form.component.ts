import { Router } from "@angular/router"
import { AuthService } from "../../service/auth.service"
import { AlertService } from "../../service/alert.service"
import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
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
    public alertService: AlertService
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
      this.alertService.clear()
      this.loading = true

      this.authService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          () => {
            this.alertService.success("Autenticado com sucesso!")
            setTimeout(() => {
              this.alertService.clear()
            }, 5000)
            this.router.navigate(["/"])
          },
          error => {
            this.alertService.error(error)
            this.loading = false
          }
        )
    } else {
      verificaValidacoesForm(this.loginForm)
    }
  }
}
