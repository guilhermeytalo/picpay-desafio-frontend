import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentsRoutingModule } from './payments.routes';
import { HeaderModule } from '@/components/header/header.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '@/components/dropdown/dropdown.module';
import { PaginationModule } from '@/components/pagination/pagination.module';
import { PaymentsService } from './services/payments.service';
import { PlaceholderModule } from '@/components/placeholder/placeholder.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    HeaderModule,
    DropdownModule,
    PaginationModule,
    PlaceholderModule,
  ],
  providers: [PaymentsService]
})
export class PaymentsModule { }
