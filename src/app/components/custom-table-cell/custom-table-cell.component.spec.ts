import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableCellComponent } from './custom-table-cell.component';

describe('CustomTableCellComponent', () => {
  let component: CustomTableCellComponent;
  let fixture: ComponentFixture<CustomTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTableCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
