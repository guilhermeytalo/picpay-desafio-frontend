import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login.component';
import { LoginRoutingModule } from './login.routes';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
