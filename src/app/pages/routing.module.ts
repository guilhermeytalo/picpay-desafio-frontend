import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../helpers/auth/auth.guard"

// Components
import { LoginFormComponent } from "../shared/login-form/login-form.component"
import { PaymentsListComponent } from "../shared/payments-list/payments-list.component"
import { RegisterFormComponent } from "../shared/register-form/register-form.component"

// Pages
import { DashboardComponent } from "./dashboard/dashboard.component"
import { LoginComponent } from "./login/login.component"
import { ProfileComponent } from "./profile/profile.component"
import { RegisterComponent } from "./register/register.component"

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: PaymentsListComponent },
      { path: "profile", component: ProfileComponent },
    ],
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
  {
    path: "register",
    component: RegisterComponent,
    children: [{ path: "", component: RegisterFormComponent }],
  },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
