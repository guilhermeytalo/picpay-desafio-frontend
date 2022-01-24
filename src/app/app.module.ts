import { AppRoutingModule } from "./app.routing";
import { MaterialModule } from "./material.module";
import { AuthComponent } from "./pages/auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/form/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { TableComponent } from "./components/table/table.component";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlPtBr } from "./share/utils/paginator/paginator-ptbr";
import { DialogComponent } from "./components/dialog-confirm/dialog.component";
import { CreateComponent } from "./components/form/create/create.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { HttpRequestInterceptor } from "./core/interceptors/http-request.interceptor";
import { UserComponent } from './components/form/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    TableComponent,
    DialogComponent,
    CreateComponent,
    ProfileComponent,
    SpinnerComponent,
    UserComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlPtBr,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
