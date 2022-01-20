import { NgModule } from "@angular/core";
import { AuthComponent } from "./pages/auth/auth.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "home", component: AuthComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
