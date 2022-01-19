import { MaterialModule } from "./material.module";
import { AuthService } from "./pages/auth/shared/auth.service";
import { AuthComponent } from "./pages/auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
