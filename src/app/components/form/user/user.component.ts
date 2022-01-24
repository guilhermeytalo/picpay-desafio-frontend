import { ProfileService } from "./../../../pages/profile/shared/profile.service";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Profile } from "src/app/pages/profile/shared/profile.model";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: Profile = JSON.parse(localStorage.getItem("user"));
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    });
  }

  editProfile() {
    if (this.userForm.value.password === this.userForm.value.passwordConfirm) {
      this.profileService
        .updateTask(this.user.id, {
          name: this.userForm.value.name,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
        })
        .subscribe({
          next: (res) => {
            localStorage.setItem("user", JSON.stringify(res));
          },
        });
    } else {

    }
  }
}
