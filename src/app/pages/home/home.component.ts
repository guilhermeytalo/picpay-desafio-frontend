import { Subject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CreateComponent } from "src/app/components/form/create/create.component";
import { TasksService } from "./shared/tasks.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private tasksService: TasksService
  ) {}

  eventsSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {}

  openCreateTask() {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.eventsSubject.next();
        }
      },
    });
  }
}
