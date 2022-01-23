import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { RouterModule } from '@angular/router';
import { appRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataModule } from './data/data.module';
import { InfraModule } from './infra/infra.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoRootModule,
    RouterModule,
    appRoutingModule,
    BrowserAnimationsModule,
    DataModule,
    InfraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
