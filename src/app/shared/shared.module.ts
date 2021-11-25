import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { LogoComponent } from './components/logo/logo.component';
import { TitleComponent } from './components/title/title.component';
import { CustomPaginatorDirective } from './directives/custom-paginator.directive';
import { SharedInjectorInstance } from './shared-injector-instance';

@NgModule({
  declarations: [CustomPaginatorDirective, DialogConfirmationComponent, LogoComponent, TitleComponent],
  exports: [
    CommonModule,
    CustomPaginatorDirective,
    LogoComponent,
    TitleComponent,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskModule,
    MatTooltipModule
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgxMaskModule.forRoot()
  ],

  providers: [DatePipe, CurrencyPipe]
})
export class SharedModule {
  constructor(private injector: Injector) {
    SharedInjectorInstance.setInjector(this.injector);
  }
}
