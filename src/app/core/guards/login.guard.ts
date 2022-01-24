import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SnackBarService } from "src/app/components/snack-bar/snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private snackBar: SnackBarService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem("user")) {
      this.router.navigate(["/login"]);
      this.snackBar.openSnackBar("POR FAVOR FAÇA LOGIN", "X");
      return false;
    }
    return true;
  }
}
