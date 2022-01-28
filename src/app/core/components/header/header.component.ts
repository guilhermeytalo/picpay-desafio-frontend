import { AccountService } from "./../../../auth/services/account/account.service";
import { Component, OnInit, HostListener } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "src/app/auth/store/auth.selectors";
// import { AuthService } from 'src/app/auth/services/auth.service';
// import {
//   isUserAuth,
//   selectPhotoUserLogged,
// } from 'src/app/auth/state/auth.selectors';
// import { AuthStoreService } from 'src/app/auth/state/auth.store.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isUserAuth = false;

  constructor(
    private router: Router,
    private store: Store,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.store.select(isAuthenticated).subscribe((auth) => {
      this.isUserAuth = auth;
    });
  }

  redirectTasks() {
    this.router.navigateByUrl("/tasks");
  }

  redirectLogin() {
    this.router.navigateByUrl("/auth/login");
  }

  redirectMyProfile() {
    this.router.navigateByUrl("/profile");
  }

  logout() {
    this.accountService.logout();
  }
}
