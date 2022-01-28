import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing.module';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AccountProfileComponent]
})
export class ProfileModule { }
