import { Router } from "@angular/router"
import { AccountService } from "../../service/account.service"
import { AlertService } from "../../service/alert.service"
import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { first } from "rxjs/operators"
import { BaseFormComponent } from "../base-form/base-form.component"
import { UserService } from "src/app/service/user.service"
import { User } from "src/app/models/user"

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  loading = false
  users = []

  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    private userService: UserService
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

    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        localStorage.setItem("users", JSON.stringify(users))
        this.users = users
      })

    this.accountService
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
          console.log("vcaiu aqui")
          this.alertService.error(error)
          this.loading = false
        }
      )
  }
}
