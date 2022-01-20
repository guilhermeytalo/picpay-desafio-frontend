import { Auth } from "./shared/auth.model";
import { AuthService } from "./shared/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
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
      this.router.navigate(['/home'])
    } else {
      console.log("NAO IGUAL");

      console.log(auth.email, "EMAIL AUTH");
      console.log(auth.password, "SENHA AUTH");
      console.log(this.authForm.value.email, "EMAIL FORM")
      console.log(this.authForm.value.password, "SENHA FORM")
    }
  }
}
