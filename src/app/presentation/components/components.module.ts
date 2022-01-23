import { NgModule } from '@angular/core';
import { ISnackBar } from '@app/shared/class/isnackbar';
import AngularMaterialModule from './angular-material/angular-material.module';
import { SnackBarService } from './toast/snackbar';

@NgModule({
  imports: [],
  exports: [AngularMaterialModule],
  declarations: [],
  providers: [
    {
      provide: ISnackBar,
      useClass: SnackBarService
    }
  ]
})
export class ComponentsModule {}
