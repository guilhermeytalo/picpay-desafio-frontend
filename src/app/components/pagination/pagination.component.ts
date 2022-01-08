import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  options!: number[];
  visibleOptions!: number[];
  visibleOptionsSize = 5;
  @Input() total: number;

  selectedOption: number;

  @Output() update: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.options = Array(this.total).fill(null).map((value: any, index: number) => index + 1);
    this.updateVisibleOptions(0, this.visibleOptionsSize);
    this.selectedOption = this.visibleOptions[0];
  }

  updateSelection(value: number): void {
    if (value !== this.selectedOption) {
      this.selectedOption = value;
      this.update.emit(value);
    }
  }

  next() {
    const next = this.selectedOption + 1;

    if (next <= this.total) {
      if (next > this.visibleOptions[this.visibleOptionsSize - 1]) {
        this.updateVisibleOptions(next - this.visibleOptionsSize, next);
      }

      this.updateSelection(next);
    }
  }

  updateVisibleOptions(start: number, end: number): void {
    this.visibleOptions = this.options.slice(start, end);
  }

  prev() {
    const prev = this.selectedOption - 1;

    if (!!prev) {
      if (prev < this.visibleOptions[0]) {
        this.updateVisibleOptions(prev - 1, prev + this.visibleOptionsSize - 1);
      }

      this.updateSelection(prev);
    }
  }
}
