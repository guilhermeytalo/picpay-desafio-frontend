import { Auth } from "./shared/auth.model";
import { AuthService } from "./shared/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {


  constructor(

  ) {}

  ngOnInit(): void {

  }


}
