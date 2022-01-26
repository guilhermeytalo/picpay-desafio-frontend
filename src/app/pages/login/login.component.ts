import { Component, OnInit } from "@angular/core"
import { first } from "rxjs/operators"
import { User } from "src/app/models/user"
import { AuthService } from "src/app/service/auth.service"
import { UserService } from "src/app/service/user.service"
import { REGISTERED_USERS } from "src/app/constants/global"

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  currentUser: User
  registeredUsers = []

  constructor(private authService: AuthService, private userService: UserService) {
    this.currentUser = this.authService.currentUserValue
  }

  ngOnInit() {
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        localStorage.setItem(REGISTERED_USERS, JSON.stringify(users))
        this.registeredUsers = users
      })
  }
}
