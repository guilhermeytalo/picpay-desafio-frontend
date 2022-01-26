// Modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

// Material Modules
import { MatTableModule } from "@angular/material/table"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from "@angular/material/toolbar"
import { ModalComponent } from "./modal/modal.component"

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { ErrorInterceptor } from "../helpers/error.interceptor"
import { JwtInterceptor } from "../helpers/jwt.interceptor"

//Components
import { HeaderComponent } from "./header/main-header.component"
import { PaymentsListComponent } from "./payments-list/payments-list.component"
import { SearchComponent } from "./search/search.component"
import { LoginFormComponent } from "./login-form/login-form.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ErrorMsgComponent } from "./error-msg/error-msg.component"
import { fakeBackendProvider } from "../helpers/fake-backend"
import { NgxPaginationModule } from "ngx-pagination"

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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
