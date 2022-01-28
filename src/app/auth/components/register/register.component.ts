import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackBarService } from "src/app/core/services/snack-bar/snack-bar.service";
import { AccountService } from "../../services/account/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  get f() {
    return this.form;
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required],
    });
  }

  back() {
    this.router.navigateByUrl("/auth/login");
  }

  onSubmit() {
    this.loading = true;
    this.accountService.signup(this.form.value).subscribe((resp) => {
      if (resp) {
        this.loading = false;
        this.form.reset();
        this.snackBarService.openSnackBar("Cadastro realizado com sucesso", "");
        this.router.navigateByUrl("/auth/login");
      } else {
        this.loading = false;
        this.snackBarService.openSnackBar(
          "Ops, não foi possível realizar seu cadastro",
          ""
        );
      }
    });
  }
}
