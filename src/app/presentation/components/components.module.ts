import { NgModule } from '@angular/core';
import { ISnackBar } from '@shared/interfaces/isnackbar';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import AngularMaterialModule from './angular-material/angular-material.module';
import { SortTableComponent } from './sort-table/sort-table.component';
import { SnackBarService } from './toast/snackbar';

@NgModule({
  imports: [AngularMaterialModule],
  exports: [AngularMaterialModule, SortTableComponent, ActionsTableComponent],
  declarations: [SortTableComponent, ActionsTableComponent],
  providers: [
    {
      provide: ISnackBar,
      useClass: SnackBarService
    }
  ]
})
export class ComponentsModule {}
