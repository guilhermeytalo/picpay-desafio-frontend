import { TaskAddEditComponent } from "./../task-add-edit/task-add-edit.component";
import { TaskService } from "./../../service/task.service";
import { TaskModel } from "./../../models/TaskModel";
import {  Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { TaskDeleteComponent } from "../task-delete/task-delete.component";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TaskModel>;

  displayedColumns: string[] = [
    "user",
    "title",
    "date",
    "value",
    "isPayed",
    "action",
  ];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.getTasksAndSetDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

  getTasksAndSetDataSource() {
    this.taskService.getTasks().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogAddEdit(object?: any) {
    const dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: "600px",
      data: object,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "sucess") {
        this.getTasksAndSetDataSource();
      }
    });
  }

  openDialogDelete(object: any) {
    const dialogRef = this.dialog.open(TaskDeleteComponent, {
      width: "600px",
      data: object,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "sucess") {
        this.getTasksAndSetDataSource();
      }
    });
  }
}
