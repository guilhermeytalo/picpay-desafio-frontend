import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './login.component';
import {FormComponent} from './form/form.component';


@NgModule({
  declarations: [
      LoginComponent,
      FormComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
