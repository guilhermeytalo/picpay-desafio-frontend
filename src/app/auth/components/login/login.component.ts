import { SnackBarService } from './../../../core/services/snack-bar/snack-bar.service';
import { Router } from "@angular/router";
import { AccountService } from "./../../services/account/account.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  get f() {
    return this.form;
  }

  createForm() {
    this.form = this.fb.group({
      email: ["", Validators.email],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.accountService.login(this.form.value).subscribe((resp) => {
      if (resp) {
        this.loading = false;
        this.form.reset();
        this.router.navigateByUrl("/tasks");
      } else {
        this.loading = false;
        this.snackBarService.openSnackBar('Usuário/Senha inválidos', '')
      }
    });
  }
}
