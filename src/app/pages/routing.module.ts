import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: HomeComponent,
  },
  {
    path: "",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
