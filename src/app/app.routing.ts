import { LoginGuard } from "./core/guards/login.guard";
import { ProfileComponent } from "./pages/profile/profile.component";
import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./pages/auth/auth.component";
import { RouterModule, Routes } from "@angular/router";
import { IsLoggedGuard } from "./core/guards/is-logged.guard";

const routes: Routes = [
  { path: "login", component: AuthComponent, canActivate: [IsLoggedGuard] },
  { path: "home", component: HomeComponent,  canActivate: [LoginGuard]},
  { path: "profile", component: ProfileComponent,  canActivate: [LoginGuard]},
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
