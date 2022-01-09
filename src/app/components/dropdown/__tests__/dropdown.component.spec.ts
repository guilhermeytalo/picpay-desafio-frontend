import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from '../dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.options = ['5'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected value', () => {
    spyOn(component.update, 'emit');
    component.selectedOption = '10';
    component.updateSelection('20');
    expect(component.selectedOption).toEqual('20');
    expect(component.update.emit).toHaveBeenCalledWith('20');
  });

});
