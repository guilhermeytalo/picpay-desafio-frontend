import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

import { PagesModule } from "./pages/pages.module"
import { ErrorInterceptor } from "./helpers/error.interceptor"
import { JwtInterceptor } from "./helpers/jwt.interceptor"

/* Importando a configuração de algumas linguagens */
import { registerLocaleData } from "@angular/common"
import localePT from "@angular/common/locales/pt"

registerLocaleData(localePT)

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, PagesModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
