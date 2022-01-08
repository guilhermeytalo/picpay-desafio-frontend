import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() title: string = null;
  @Input() options!: string[];

  selectedOption: string;

  @Output() update: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  updateSelection(value: string): void {
    if (value !== this.selectedOption) {
      this.selectedOption = value;
      this.update.emit(value);
    }
  }

}
