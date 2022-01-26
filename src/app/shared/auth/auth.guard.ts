import { Injectable } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { AccountService } from "../../service/account.service"
import { AUTH_TOKEN } from "src/app/constants/global"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const currentUser = this.accountService.currentUserValue

    if (token && currentUser) {
      return true
    } else {
      this.router.navigate(["login"])
      return false
    }
  }
}
