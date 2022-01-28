import { ProfileModule } from "./profile/profile.module";

import { AccountModelReducer } from "./auth/store/auth.reducer";
import { RouterModule } from "@angular/router";
import { CoreModule } from "./core/core.module";
import { TaskModule } from "./task/task.module";
import { AuthModule } from "./auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app.routing.module";
import { metaReducerLocalStorage } from "./core/config/MetaReducerLocalStorage";
import { AuthGuardService } from "./core/services/guard/auth.guard.service";

import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";

registerLocaleData(ptBr);
@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TaskModule,
    ProfileModule,
    MatNativeDateModule,
    StoreModule.forRoot(
      { accountEntries: AccountModelReducer },
      { metaReducers: [metaReducerLocalStorage] }
    ),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuardService,
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
