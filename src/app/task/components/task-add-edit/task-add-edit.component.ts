import { TaskService } from "./../../service/task.service";
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskModel } from "../../models/TaskModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackBarService } from "src/app/core/services/snack-bar/snack-bar.service";

@Component({
  selector: "app-task-add-edit",
  templateUrl: "./task-add-edit.component.html",
  styleUrls: ["./task-add-edit.component.scss"],
})
export class TaskAddEditComponent {
  form: FormGroup;
  loading = false;
  title = "";
  textSlideToggle = "Não Pago";

  constructor(
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBarService: SnackBarService,
    @Optional() @Inject(MAT_DIALOG_DATA) public task: TaskModel
  ) {
    if (task) {
      this.title = "Editar Pagamento";
      if (task.isPayed) {
        this.textSlideToggle = "Pago";
      }
      this.createForm(task);
    } else {
      this.title = "Adicionar Pagamento";
      this.textSlideToggle = "Não Pago";
      this.createForm({});
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.task && this.task.id) {
      this.taskService.updateTask(this.form.value).subscribe(
        (resp) => {
          this.loading = false;
          if (resp) {
            this.dialogRef.close("sucess");
          }
        },
        (error) => {
          this.dialogRef.close("error");
        }
      );
    } else {
      this.taskService.createTask(this.form.value).subscribe(
        (resp) => {
          this.loading = false;
          if (resp) {
            this.dialogRef.close("sucess");
          }
        },
        (error) => {
          this.dialogRef.close("error");
        }
      );
    }
  }

  createForm(model: TaskModel) {
    this.form = this.fb.group({
      id: [model.id],
      name: [model.name, Validators.required],
      username: [model.username],
      value: [model.value, Validators.required],
      title: [model.title, Validators.required],
      date: [new Date(model.date), Validators.required],
      isPayed: [model.isPayed],
    });
    this.form.get("isPayed").valueChanges.subscribe((x) => {
      x == true
        ? (this.textSlideToggle = "Pago")
        : (this.textSlideToggle = "Não Pago");
    });
  }

  get f() {
    return this.form;
  }
}
