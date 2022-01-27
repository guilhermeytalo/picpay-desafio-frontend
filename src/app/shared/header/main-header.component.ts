import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../service/auth.service"
import { User } from "../../models/user"
import { REGISTERED_USERS } from "src/app/constants/global"
@Component({
  selector: "main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.scss"],
})
export class HeaderComponent implements OnInit {
  currentUser: User

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x))
  }

  ngOnInit() {
    let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []
    const userProfille = users.find(user => user.email === this.currentUser.email)
    this.currentUser = userProfille
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
