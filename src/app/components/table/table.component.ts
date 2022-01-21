import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { take } from "rxjs/operators";
import { HomeTask } from "src/app/pages/home/shared/Hometask.model";
import { TasksService } from "src/app/pages/home/shared/tasks.service";
import { Page, PageRequest } from "./paginator/paginator";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements AfterViewInit, OnInit {
  data: HomeTask[];
  displayedColumns: string[] = ["name", "title", "date", "value", "isPayed", " "];

  page: Page<HomeTask> = new Page([], 100);
  pageEvent: PageEvent;
  sortEvent: Sort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formGroupSearch: FormGroup;

  constructor(
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formGroupSearch = this.formBuilder.group({
      search: [null],
    });
    this.listTasks();
  }

  clearSearch() {
    this.formGroupSearch.reset();
    this.listTasks();
  }

  listTasks() {
    const queryAdicional = new Map();
    if (this.formGroupSearch.value.search) {
      queryAdicional.set("name_like", this.formGroupSearch.value.search);
    }

    this.taskService
      .getTasks(
        new PageRequest(
          {
            pageNumber: this.pageEvent ? this.pageEvent.pageIndex : 0,
            pageSize: this.pageEvent ? this.pageEvent.pageSize : 5,
          },
          {
            property: this.sortEvent ? this.sortEvent.active : "id",
            direction: this.sortEvent ? this.sortEvent.direction : "asc",
          },
          queryAdicional
        )
      )
      .pipe(take(1))
      .subscribe(
        (page) => {
          console.log(page, "PAGE");
          this.page = page;
        },
        (error) => {
          this.page = new Page([], 0);
        }
      );
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    console.log(
      this.page.content.filter((filterValue) => filterValue == filterValue)
    );
  }
}
