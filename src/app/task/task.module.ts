import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./../core/core.module";
import { TaskDeleteComponent } from "./components/task-delete/task-delete.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskAddEditComponent } from "./components/task-add-edit/task-add-edit.component";
import { TaskRoutingModule } from "./task.routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxMaskModule } from "ngx-mask";
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  declarations: [TaskAddEditComponent, TaskListComponent, TaskDeleteComponent],
})
export class TaskModule {}
