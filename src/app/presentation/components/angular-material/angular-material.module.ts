import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule
  ]
})
export default class AngularMaterialModule {}
