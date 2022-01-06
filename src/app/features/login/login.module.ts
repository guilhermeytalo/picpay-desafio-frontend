import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login.component';
import { LoginRoutingModule } from './login.routes';
import { FormModule } from './components/form/form.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }
