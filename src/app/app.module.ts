import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login/login.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [	
    AppComponent, HeaderComponent, NavComponent, LoginComponent
   ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
