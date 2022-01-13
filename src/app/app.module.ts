import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';

import { MaterialModule } from './material.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { AddModalComponent } from './components/modal/add-modal/add-modal.component';
import { TaskComponent } from './components/forms/task/task.component';
import { CustomTableCellComponent } from './components/custom-table-cell/custom-table-cell.component';
import { DeleteModalComponent } from './components/modal/delete-modal/delete-modal.component';
import { EditModalComponent } from './components/modal/edit-modal/edit-modal.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

@NgModule({
  declarations: [	
    AppComponent, DashboardComponent, ProfileComponent, LoginComponent, NavbarComponent, TableComponent, AddModalComponent, TaskComponent, CustomTableCellComponent, DeleteModalComponent, EditModalComponent, LoginFormComponent,
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
