import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login.routes';
import { FormModule } from './components/form/form.module';

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
  ]
})
export class LoginModule { }
