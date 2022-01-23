import { Router } from "@angular/router";
import { AccountService } from "../../service/account.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  login = {
    email: "",
    password: "",
  };

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate([""]);
    } catch (error) {
      console.error(error);
    }
  }
}
