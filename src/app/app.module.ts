import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent, LoginComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    // Material Components
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
