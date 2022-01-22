import { Component, OnInit } from "@angular/core";
import { TaskApiService } from "src/app/service/task-api.service";

@Component({
  selector: "task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  private setAllTasks: any;
  public getAllTasks: any;
  public apiError: boolean = false;

  constructor(private taskApiService: TaskApiService) {}

  ngOnInit(): void {
    this.taskApiService.getTaskList.subscribe(
      (tasks) => {
        this.setAllTasks = tasks;
        this.getAllTasks = this.setAllTasks;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    console.log("✅ ~ value", value);
    console.log("✅ ~ setAllTasks", this.setAllTasks);

    const filter = this.setAllTasks.filter((task: any) => {
      return !task.name.indexOf(value.toLowerCase());
    });
    console.log("✅ ~ filter", filter);

    this.getAllTasks = filter;
  }
}
