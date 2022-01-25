import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sort-table',
  templateUrl: 'sort-table.component.html'
})
export class SortTableComponent {
  @Input() direction: string;
  @Input() orderBy: string;
  @Input() column: string;

  public get classSort(): string {
    if (this.orderBy !== this.column && this.column !== '') {
      console.log(this.direction);
      return 'unfold_more';
    } else if (this.orderBy === this.column && this.direction === 'DESC') {
      return 'arrow_downward';
    } else {
      return 'arrow_upward';
    }
  }
}
