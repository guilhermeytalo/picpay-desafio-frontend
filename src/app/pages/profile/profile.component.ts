import { AuthService } from "./../auth/shared/auth.service";
import { Component, OnInit } from "@angular/core";
import { Auth } from "../auth/shared/auth.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profile: Auth = JSON.parse(localStorage.getItem("user"));

  constructor(private autoService: AuthService) {}

  ngOnInit(): void {
  }
}
