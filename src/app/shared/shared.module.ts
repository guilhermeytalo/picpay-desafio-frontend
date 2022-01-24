import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

//Components
import { HeaderComponent } from "./header/main-header.component"
import { PaymentsListComponent } from "./payments-list/payments-list.component"
import { SearchComponent } from "./search/search.component"
import { ModalComponent } from "./modal/modal.component"
import { LoginFormComponent } from "./login-form/login-form.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { AlertComponent } from "./alert/alert.component"
import { ErrorMsgComponent } from "./error-msg/error-msg.component"
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    SearchComponent,
    PaymentsListComponent,
    ModalComponent,
    LoginFormComponent,
    AlertComponent,
    ErrorMsgComponent,
  ],
  exports: [HeaderComponent, SearchComponent, PaymentsListComponent, ModalComponent],
})
export class SharedModule {}
