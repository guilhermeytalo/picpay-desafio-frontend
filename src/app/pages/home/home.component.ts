import { Subject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CreateComponent } from "src/app/components/form/create/create.component";
import { TasksService } from "./shared/tasks.service";
import { SnackBarService } from "src/app/components/snack-bar/snack-bar.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private snackBar: SnackBarService) {}

  eventsSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {}

  openCreateTask() {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.openSnackBar("REGISTRO CRIADO COM SUCESSO", "X");
          this.eventsSubject.next();
        }
      },
    });
  }
}
