import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [	
    AppComponent, HeaderComponent, NavComponent
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
