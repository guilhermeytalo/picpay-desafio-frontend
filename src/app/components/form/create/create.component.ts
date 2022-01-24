import { HomeTask } from "./../../../pages/home/shared/homeTask.model";
import { TasksService } from "src/app/pages/home/shared/tasks.service";
import { Validators } from "@angular/forms";
import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  taskForm: FormGroup;
  datePipeString: string;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: HomeTask,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.taskForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
        value: [this.data.value, [Validators.required]],
        date: [
          formatDate(this.data.date, "yyyy-MM-dd", this.locale),
          [Validators.required],
        ],
        title: [this.data.title],
      });
    } else {
      this.isEdit = false;
      this.taskForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        value: [null, [Validators.required]],
        date: [null, [Validators.required]],
        title: [null],
      });
    }
  }

  createTask() {
    if (!this.isEdit) {
      this.taskForm.value.date = new Date(
        this.taskForm.value.date
      ).toISOString();
      this.tasksService.createTask(this.taskForm.value).subscribe({
        next: (res) => {
          console.log(res, " RESPOSTA CREATE");
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.isEdit) {
      this.taskForm.value.date = new Date(
        this.taskForm.value.date
      ).toISOString();
      this.tasksService
        .updateTask(this.data.id, this.taskForm.value)
        .subscribe({
          next: (res) => {
            console.log(res, "ALTERADO");
          },
        });
    }
  }
}
