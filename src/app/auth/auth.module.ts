import { RegisterComponent } from "./components/register/register.component";
import { CoreModule } from "./../core/core.module";
import { LoginComponent } from "./components/login/login.component";
import { AuthRoutingModule } from "./auth.routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "./services/account/account.service";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AccountService],
})
export class AuthModule {}
