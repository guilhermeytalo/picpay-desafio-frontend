
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  hide = true;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this._authService.login(this.formLogin.value).subscribe((response) => {
      if (response.length === 0) {
        console.error("Dados invalidos!");
      } else {
        localStorage.setItem("token_app", JSON.stringify(response));
        this._authService.showHeaderMenuEmitter.emit(true);
        this._router.navigate(["/payments"]);
      }
    });
  }
}
