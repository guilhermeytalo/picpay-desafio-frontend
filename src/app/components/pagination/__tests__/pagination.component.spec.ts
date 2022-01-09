import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from '../pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 10;
    fixture.detectChanges();
    component.ngOnChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should config options on changes inputs', () => {
    expect(component.options.length).toEqual(10);

    component.options.forEach((item, index) => {
      expect(component.options[index]).toEqual(item);
    });

    expect(component.selectedOption).toEqual(component.options[0]);
  });

  it('should update selected value', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 10;
    component.updateSelection(20);

    expect(component.selectedOption).toEqual(20);
    expect(component.update.emit).toHaveBeenCalledWith(20);
  });

  it('should not update selected value', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 20;
    component.updateSelection(20);

    expect(component.selectedOption).toEqual(20);
    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('should go to next page', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 1;
    component.next();

    expect(component.update.emit).toHaveBeenCalledWith(2);
    expect(component.selectedOption).toEqual(2);
  });

  it('should dont go to next page', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 1;
    component.total = 1;
    component.next();

    expect(component.update.emit).not.toHaveBeenCalled();
    expect(component.selectedOption).toEqual(1);
  });

  it('should go to next page and change visible pages', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 5;
    component.next();

    expect(component.update.emit).toHaveBeenCalledWith(6);
    expect(component.selectedOption).toEqual(6);
    expect(component.visibleOptions[0]).toEqual(2);
    expect(component.visibleOptions[4]).toEqual(6);
  });

  it('should go to prev page', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 5;
    component.prev();

    expect(component.update.emit).toHaveBeenCalledWith(4);
    expect(component.selectedOption).toEqual(4);
  });

  it('should go to prev page', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 1;
    component.prev();

    expect(component.update.emit).not.toHaveBeenCalled();
    expect(component.selectedOption).toEqual(1);
  });

  it('should go to previous page and change visible pages', () => {
    spyOn(component.update, 'emit');

    component.selectedOption = 5;
    component.visibleOptions = [5, 6, 7, 8, 9, 10];
    component.prev();

    expect(component.selectedOption).toEqual(4);
    expect(component.visibleOptions[0]).toEqual(4);
    expect(component.visibleOptions[4]).toEqual(8);
    expect(component.update.emit).toHaveBeenCalledWith(4);
  });
});
