import { Validators } from "@angular/forms";
import { AuthService } from "./../../../pages/auth/shared/auth.service";
import { Auth } from "./../../../pages/auth/shared/auth.model";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackBarService } from "../../snack-bar/snack-bar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  authForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.authService.getAccount().subscribe({
      next: (res) => {
        this.authLogin(res[0]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  authLogin(auth: Auth) {
    if (
      this.authForm.value.email === auth.email &&
      this.authForm.value.password === auth.password
    ) {
      this.router.navigate(["home"]);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: auth.name, email: auth.email })
      );
    } else {
      this.snackBar.openSnackBar("USUÁRIO OU SENHA INCORRETO", "X");
    }
  }
}
