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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';


import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PaymentsComponent } from './views/payment/payments.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentsAddComponent } from './components/payments/payments-add/payments-add.component';

import { PaymentsRemoveComponent } from './components/payments/payments-remove/payments-remove.component';

import { CookieService } from 'ngx-cookie-service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoginService } from './services/login/login.service';
import { PaymentsService } from './services/payments/payments.service';
import { FeedbackService } from './services/feedback/feedback.service';
import { FormatterService } from './services/formatter/formatter.service';
import { TableHeaderComponent } from './components/payments/table-header/table-header.component';
import { TableFilterComponent } from './components/payments/table-filter/table-filter.component';
import { FilterDialogComponent } from './components/payments/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PaymentsComponent,
    PaymentsAddComponent,
    PaymentsRemoveComponent,
    TableHeaderComponent,
    TableFilterComponent,
    FilterDialogComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    NgxSliderModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    // Material Components
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
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
    FeedbackService,
    PaymentsService,
    FormatterService,
    MatPaginatorIntl,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
