// Modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { OrderModule } from "ngx-order-pipe"

// Material Modules
import { MatTableModule } from "@angular/material/table"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from "@angular/material/toolbar"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

//Components
import { HeaderComponent } from "./header/main-header.component"
import { PaymentsListComponent } from "./payments-list/payments-list.component"
import { SearchPipe } from "../pipes/search.pipe"
import { LoginFormComponent } from "./login-form/login-form.component"
import { RegisterFormComponent } from "./register-form/register-form.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ErrorMsgComponent } from "./error-msg/error-msg.component"
import { fakeBackendProvider } from "../helpers/fake-backend"
import { NgxPaginationModule } from "ngx-pagination"
import { ModalComponent } from "./modal/modal.component"

// Interceptors
import { ErrorInterceptor } from "../helpers/error.interceptor"
import { DialogComponent } from "./dialog/dialog.component"

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
    OrderModule,
  ],
  declarations: [
    HeaderComponent,
    SearchPipe,
    PaymentsListComponent,
    ModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DialogComponent,
    ErrorMsgComponent,
  ],
  exports: [HeaderComponent, PaymentsListComponent, ModalComponent, DialogComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, fakeBackendProvider],
})
export class SharedModule {}
