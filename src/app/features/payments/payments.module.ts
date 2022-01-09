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
import { PopupModule } from '@/components/popup/popup.module';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DeleteComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    HeaderModule,
    DropdownModule,
    PaginationModule,
    PlaceholderModule,
    PopupModule
  ],
  providers: [PaymentsService]
})
export class PaymentsModule { }
