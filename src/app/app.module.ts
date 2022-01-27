import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

import { PagesModule } from "./pages/pages.module"

/* Importando a configuração de algumas linguagens */
import { registerLocaleData } from "@angular/common"
import localePT from "@angular/common/locales/pt"
import { ToastComponent } from "./shared/toast/toast.component"

registerLocaleData(localePT)

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, PagesModule, HttpClientModule],
  declarations: [AppComponent, ToastComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
