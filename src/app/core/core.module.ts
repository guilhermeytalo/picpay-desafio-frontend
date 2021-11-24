import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent, LoadingComponent, NotFoundComponent } from '@app/core/components';
import { SharedModule } from '@app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { PaginatorIntlService } from './services/paginator-intl.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    OverlayModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule
  ],
  declarations: [LoadingComponent, HeaderComponent, NotFoundComponent, LoginComponent, ShellComponent, SnackbarComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }]
})
export class CoreModule {}
