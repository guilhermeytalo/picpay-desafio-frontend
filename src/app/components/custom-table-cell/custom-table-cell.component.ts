import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-table-cell',
  templateUrl: './custom-table-cell.component.html',
  styleUrls: ['./custom-table-cell.component.scss']
})
export class CustomTableCellComponent implements OnInit {
  @Input()
  imageUrl: string;
  @Input()
  title: string;
  @Input()
  subtitle: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.subtitle || this.subtitle === "") {
      let date: Date = new Date(this.title);
      this.title = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`;
      this.subtitle = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
  }

}
