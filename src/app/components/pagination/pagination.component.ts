import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() options!: number[];

  selectedOption: number;

  @Output() update: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  updateSelection(value: number): void {
    if (value !== this.selectedOption) {
      this.selectedOption = value;
      this.update.emit(value);
    }
  }
}
