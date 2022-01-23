import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  exports: [MatButtonModule, MatToolbarModule, MatInputModule]
})
export default class AngularMaterialModule {}
