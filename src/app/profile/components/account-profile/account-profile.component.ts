import { SnackBarService } from "./../../../core/services/snack-bar/snack-bar.service";
import { ProfileService } from "./../../services/profile.service";
import { AccountStoreService } from "./../../../auth/services/account/account-store.service";
import { AccountModel } from "./../../../auth/models/AccountModel";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-profile",
  templateUrl: "./account-profile.component.html",
  styleUrls: ["./account-profile.component.scss"],
})
export class AccountProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private accountStoreService: AccountStoreService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.createForm(this.accountStoreService.getAccountModel());
  }

  onSubmit() {
    this.loading = true;
    this.profileService.updateAccount(this.form.value).subscribe(
      (resp) => {
        if (resp) {
          this.loading = false;
          this.snackBarService.openSnackBar("Dados atualizado com sucesso", "");
        } else {
          this.snackBarService.openSnackBar(
            "Ops, ocorreu um erro tente novamente mais tarde",
            ""
          );
        }
      },
      (error) => {
        this.snackBarService.openSnackBar(
          "Ops, ocorreu um erro tente novamente mais tarde",
          ""
        );
      }
    );
  }

  createForm(model: AccountModel) {
    this.form = this.fb.group({
      id: [model.id],
      name: [model.name, Validators.required],
      email: [model.email, Validators.required],
      password: [model.password, Validators.required],
    });
  }

  get f() {
    return this.form;
  }
}
