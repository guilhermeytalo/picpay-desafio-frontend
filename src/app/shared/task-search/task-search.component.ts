import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "task-search",
  templateUrl: "./task-search.component.html",
  styleUrls: ["./task-search.component.scss"],
})
export class TaskSearchComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public search(value: string) {
    this.emmitSearch.emit(value);
  }
}
