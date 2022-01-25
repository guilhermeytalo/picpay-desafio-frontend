import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorInterface } from '@app/shared/interfaces/mat-pagination-event.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent {
  @Input() totalCount: number;
  @Input() pagination: { _page: number; _limit: number };
  @Output() page: EventEmitter<MatPaginatorInterface> =
    new EventEmitter<MatPaginatorInterface>();

  public pagEvent(event: MatPaginatorInterface) {
    this.page.emit(event);
  }
}
