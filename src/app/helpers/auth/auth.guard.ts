import { Injectable } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { AuthService } from "../../service/auth.service"
import { AUTH_JWT_TOKEN } from "src/app/constants/global"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem(AUTH_JWT_TOKEN)
    const currentUser = this.authService.currentUserValue

    if (token && currentUser) {
      return true
    } else {
      this.router.navigate(["login"])
      return false
    }
  }
}
