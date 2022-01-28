import { Component, OnInit } from "@angular/core"
import { User } from "src/app/models/user"
import { AuthService } from "src/app/service/auth.service"
import { AUTH_USER, REGISTERED_USERS } from "src/app/constants/global"
import { UserService } from "src/app/service/user.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { first } from "rxjs/operators"
import { ToastService } from "src/app/service/toast.service"
import { Router } from "@angular/router"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { DialogComponent } from "src/app/shared/dialog/dialog.component"

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUser: User
  loading = true
  profileForm: FormGroup
  submitted = false
  hide: boolean = true
  currentUserId: number = null
  registeredUsers: User[] = []

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x))
  }

  ngOnInit() {
    this.getUserData()
  }

  get f() {
    return this.profileForm.controls
  }

  getUserData() {
    let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []
    this.registeredUsers = users

    const userProfille = users.find((user: User) => user.email === this.currentUser.email)
    this.currentUser = userProfille
    this.currentUserId = userProfille.id
    this.loading = false

    this.profileForm = this.formBuilder.group({
      username: [this.currentUser.username, [Validators.required]],
      name: [this.currentUser.name, [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      password: [this.currentUser.password, [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true
    this.toastService.clear()

    const body: User = {
      id: this.currentUserId,
      username: this.profileForm.value.username,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
    }

    this.loading = true
    this.userService
      .update(body)
      .pipe(first())
      .subscribe(
        () => {
          this.registeredUsers.push(body)

          localStorage.setItem(AUTH_USER, JSON.stringify(body))
          localStorage.setItem(REGISTERED_USERS, JSON.stringify(this.registeredUsers))

          this.toastService.success("Dados atualizados com sucesso!")

          this.loading = false
          this.router.navigate(["/"])
        },
        error => {
          this.toastService.error(error)
          this.loading = false
        }
      )
  }

  openDialog(description) {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.data = description
    dialogConfig.width = "400px"
    dialogConfig.height = "600px"

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(val => console.log("Dialog output:", val))
  }

  hidePassword() {
    this.hide = !this.hide
  }
}
