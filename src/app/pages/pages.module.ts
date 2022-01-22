import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Module Routing
import { RoutingModule } from "./routing.module";

// Module
import { SharedModule } from "../shared/shared.module";

// Pages
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [CommonModule, RoutingModule, SharedModule],
})
export class PagesModule {}
