import { Router } from "@angular/router"
import { AccountService } from "../../service/account.service"
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}
}
