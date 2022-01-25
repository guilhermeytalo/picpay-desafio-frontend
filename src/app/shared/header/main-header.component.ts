import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AccountService } from "../../service/account.service"
import { User } from "../../models/user"
@Component({
  selector: "main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.scss"],
})
export class HeaderComponent implements OnInit {
  currentUser: User

  constructor(private router: Router, private accountService: AccountService) {
    this.accountService.currentUser.subscribe(x => (this.currentUser = x))
  }

  ngOnInit() {}

  logout() {
    this.accountService.logout()
    this.router.navigate(["/login"])
  }
}
