import { NgModule } from '@angular/core';
import AngularMaterialModule from '@app/presentation/components/angular-material/angular-material.module';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './login.component';
import { loginRoutingModule } from './login.routing';

@NgModule({
  imports: [TranslocoModule, AngularMaterialModule, loginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}
