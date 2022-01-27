import { Component, OnInit } from "@angular/core"
import { User } from "src/app/models/user"
import { AuthService } from "src/app/service/auth.service"
import { REGISTERED_USERS } from "src/app/constants/global"

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUser: User

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x))
  }

  ngOnInit() {
    let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []
    const userProfille = users.find(user => user.email === this.currentUser.email)
    this.currentUser = userProfille
  }
}
