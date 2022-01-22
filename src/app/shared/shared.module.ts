import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

//Components
import { HeaderComponent } from "./header/main-header.component";
import { PaymentsListComponent } from "./payments-list/payments-list.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [HeaderComponent, SearchComponent, PaymentsListComponent],
  exports: [HeaderComponent, SearchComponent, PaymentsListComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
