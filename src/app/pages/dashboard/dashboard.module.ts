import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {DashboardComponent} from './dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
      DashboardComponent,
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatToolbarModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatCheckboxModule,
        MatPaginatorModule,
    ]
})
export class DashboardModule { }
