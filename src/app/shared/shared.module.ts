import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Components
import { HeaderComponent } from "./header/main-header.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskSearchComponent } from "./task-search/task-search.component";

@NgModule({
  declarations: [HeaderComponent, TaskSearchComponent, TaskListComponent],
  exports: [HeaderComponent, TaskSearchComponent, TaskListComponent],
  imports: [CommonModule],
})
export class SharedModule {}
