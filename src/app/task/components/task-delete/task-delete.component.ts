import { SnackBarService } from "./../../../core/services/snack-bar/snack-bar.service";
import { TaskService } from "./../../service/task.service";
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskModel } from "../../models/TaskModel";

@Component({
  selector: "app-task-delete",
  templateUrl: "./task-delete.component.html",
  styleUrls: ["./task-delete.component.scss"],
})
export class TaskDeleteComponent {
  task: TaskModel;

  constructor(
    private taskService: TaskService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<TaskDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TaskModel
  ) {
    this.task = data;
  }

  cancel() {
    this.dialogRef.close("cancel");
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(
      (resp) => {
        this.dialogRef.close("sucess");
        this.snackBarService.openSnackBar(
          `${this.task.title} excluido com sucesso`,
          ""
        );
      },
      (error) => {
        this.dialogRef.close("error");
        this.snackBarService.openSnackBar(
          "Ops, ocorreu um erro ao exluir o pagamento",
          ""
        );
      }
    );
  }
}
