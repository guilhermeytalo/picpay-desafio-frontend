import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/auth/auth.guard";
import { LoginFormComponent } from "../shared/login-form/login-form.component";
import { PaymentsListComponent } from "../shared/payments-list/payments-list.component";

import { Dashboard } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: Dashboard,
    children: [{ path: "", component: PaymentsListComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: LoginComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginFormComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
