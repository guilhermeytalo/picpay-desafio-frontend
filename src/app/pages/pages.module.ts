import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Module Routing
import { RoutingModule } from "./routing.module";

// Module
import { SharedModule } from "../shared/shared.module";

// Pages
import { Dashboard } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [Dashboard, LoginComponent],
  imports: [CommonModule, RoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
