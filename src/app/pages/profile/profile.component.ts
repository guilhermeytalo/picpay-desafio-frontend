import { Profile } from "./shared/profile.model";
import { UserComponent } from "./../../components/form/user/user.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SnackBarService } from "src/app/components/snack-bar/snack-bar.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profile: Profile = JSON.parse(localStorage.getItem("user"));

  constructor(private snackBar: SnackBarService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  editUser() {
    let dialogRef = this.dialog.open(UserComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.openSnackBar("USUÁRIO ALTERADO COM SUCESSO", "X");
        }
      },
    });
  }
}
