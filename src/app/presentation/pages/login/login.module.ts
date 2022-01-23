import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@app/presentation/components/components.module';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './login.component';
import { loginRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoModule,
    ComponentsModule,
    loginRoutingModule
  ],
  exports: [],
  declarations: [LoginComponent]
})
export class LoginModule {}
