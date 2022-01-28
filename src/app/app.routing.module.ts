import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./core/components/not-found/not-found.component";
import { AuthGuardService } from "./core/services/guard/auth.guard.service";

export const routes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  {
    path: "auth",
    canActivate: [AuthGuardService],
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "tasks",
    canActivate: [AuthGuardService],
    loadChildren: () => import("./task/task.module").then((m) => m.TaskModule),
  },
  {
    path: "profile",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "page-not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "/page-not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
