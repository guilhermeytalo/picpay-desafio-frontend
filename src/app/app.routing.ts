import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./pages/auth/auth.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
