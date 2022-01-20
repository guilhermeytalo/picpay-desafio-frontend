import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  @Input() avatarUrl: string = "";

  constructor() {}

  ngOnInit(): void {}
}
