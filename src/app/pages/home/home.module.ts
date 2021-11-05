import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
