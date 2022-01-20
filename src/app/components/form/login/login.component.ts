import { Validators } from "@angular/forms";
import { AuthService } from "./../../../pages/auth/shared/auth.service";
import { Auth } from "./../../../pages/auth/shared/auth.model";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    console.log("OI");
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
      console.log("IGUAL");
      this.router.navigate(["home"]);
    } else {
      console.log("NAO IGUAL");

      console.log(auth.email, "EMAIL AUTH");
      console.log(auth.password, "SENHA AUTH");
      console.log(this.authForm.value.email, "EMAIL FORM");
      console.log(this.authForm.value.password, "SENHA FORM");
    }
  }
}
