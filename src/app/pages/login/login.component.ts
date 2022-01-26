import { Component, OnInit } from "@angular/core"
import { first } from "rxjs/operators"
import { User } from "src/app/models/user"
import { AccountService } from "src/app/service/account.service"
import { UserService } from "src/app/service/user.service"
import { REGISTERED_USERS } from "src/app/constants/global"

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  currentUser: User
  users = []

  constructor(private accountService: AccountService, private userService: UserService) {
    this.currentUser = this.accountService.currentUserValue
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
        this.users = users
      })
  }
}
