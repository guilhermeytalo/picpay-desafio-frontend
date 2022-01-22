import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PresentationComponent } from './presentation.component';
import { presentationRoutingModule } from './presentation.routing';

@NgModule({
  imports: [RouterModule, presentationRoutingModule],
  exports: [],
  declarations: [PresentationComponent],
  providers: []
})
export class PresentationModule {}
