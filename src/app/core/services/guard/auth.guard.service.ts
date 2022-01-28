import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "src/app/auth/store/auth.selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private store: Store) {
    this.store.select(isAuthenticated).subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }
  private isAuthenticated: boolean;
  private routesAuth = ["/auth/login", "/auth/register"];

  private verifyAuthRoute(url: string) {
    let isAuthRoute = false;
    this.routesAuth.forEach((i) => {
      if (i == url) {
        isAuthRoute = true;
      }
    });
    return isAuthRoute;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.verifyAuthRoute(state.url) && this.isAuthenticated) {
      this.router.navigateByUrl("/tasks");
      return false;
    }

    if (this.verifyAuthRoute(state.url) && !this.isAuthenticated) {
      return true;
    }

    if (this.isAuthenticated) {
      return true;
    }

    if(!this.isAuthenticated){
      this.router.navigateByUrl("/auth/login");
      return false;
    }
  }
}
