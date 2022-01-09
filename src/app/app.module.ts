import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PaymentsComponent } from './views/payment/payments.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentsAddComponent } from './components/payments/payments-add/payments-add.component';

import { PaymentsRemoveComponent } from './components/payments/payments-remove/payments-remove.component';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login/login.service';
import { PaymentsService } from './services/payments/payments.service';
import { FormatterService } from './services/formatter/formatter.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PaymentsComponent,
    PaymentsAddComponent,
    PaymentsRemoveComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    // Material Components
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    LoginService,
    CookieService,
    PaymentsService,
    FormatterService,
    MatPaginatorIntl,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
