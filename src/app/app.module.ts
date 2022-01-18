import { AuthService } from './pages/auth/auth/shared/auth.service';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [	
    AppComponent,
    AuthComponent
   ],
  imports: [
    BrowserModule,
    AuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
