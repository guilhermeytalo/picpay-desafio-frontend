import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CreateComponent } from "src/app/components/form/create/create.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateTask() {
    this.dialog.open(CreateComponent, {
      width: '50%'
    });
  }

}
