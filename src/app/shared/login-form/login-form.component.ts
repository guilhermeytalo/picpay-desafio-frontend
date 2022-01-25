import { Router } from "@angular/router"
import { AccountService } from "../../service/account.service"
import { AlertService } from "../../service/alert.service"
import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { first } from "rxjs/operators"
import { BaseFormComponent } from "../base-form/base-form.component"

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  loading = false

  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    public alertService: AlertService
  ) {
    super()

    if (this.accountService.currentUserValue) {
      this.router.navigate(["/"])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  submit() {
    this.alertService.clear()
    this.loading = true

    this.accountService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Autenticado com sucesso!")
          setTimeout(() => {
            this.alertService.clear()
          }, 5000)
          this.router.navigate(["/"])
        },
        error => {
          this.alertService.error("Erro desconhecido")
          this.loading = false
        }
      )
  }
}
