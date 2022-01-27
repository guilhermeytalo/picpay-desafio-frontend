import { Router } from "@angular/router"
import { AuthService } from "../../service/auth.service"
import { ToastService } from "../../service/toast.service"
import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { first } from "rxjs/operators"
import { FormGroup } from "@angular/forms"
import { UserService } from "src/app/service/user.service"
import { REGISTERED_USERS } from "src/app/constants/global"
// import { verificaValidacoesForm } from "src/app/helpers/form-validations"

@Component({
  selector: "register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  loading = false
  users = []
  registerForm: FormGroup
  submitted = false
  hide: boolean = true

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public toastService: ToastService,
    public userService: UserService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"])
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  get f() {
    return this.registerForm.controls
  }

  onSubmit() {
    this.submitted = true
    this.toastService.clear()

    if (this.registerForm.invalid) return

    this.loading = true
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []
          users.push(data)
          console.log("✅ ~ users", users)

          this.toastService.success("Conta criada com sucesso!")
          console.log("✅ ~ toastService")

          this.router.navigate([""])
          console.log("✅ ~ router")

          this.loading = false
        },
        error => {
          this.toastService.error(error)
          this.loading = false
        }
      )
  }

  hidePassword() {
    this.hide = !this.hide
  }
}
