import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { loginRoutingModule } from './login.routing';

@NgModule({
  imports: [loginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}
