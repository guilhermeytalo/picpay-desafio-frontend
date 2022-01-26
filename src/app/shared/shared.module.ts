import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { ErrorInterceptor } from "../helpers/error.interceptor"
import { JwtInterceptor } from "../helpers/jwt.interceptor"

//Components
import { HeaderComponent } from "./header/main-header.component"
import { PaymentsListComponent } from "./payments-list/payments-list.component"
import { SearchComponent } from "./search/search.component"
import { ModalComponent } from "./modal/modal.component"
import { LoginFormComponent } from "./login-form/login-form.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ErrorMsgComponent } from "./error-msg/error-msg.component"
import { fakeBackendProvider } from "../helpers/fake-backend"
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    HeaderComponent,
    SearchComponent,
    PaymentsListComponent,
    ModalComponent,
    LoginFormComponent,
    ErrorMsgComponent,
  ],
  exports: [HeaderComponent, SearchComponent, PaymentsListComponent, ModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class SharedModule {}
