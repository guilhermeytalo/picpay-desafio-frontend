import { PopupModule } from '@/components/popup/popup.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { paymentMock } from 'src/_mock/payments.mock';

import { EditComponent } from '../edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PopupModule
      ],
      declarations: [EditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show popup', () => {
    component.isVisible = false;
    component.show();
    expect(component.isVisible).toBeTruthy();
  });

  it('should hide popup', () => {
    component.isVisible = true;
    component.close();
    expect(component.isVisible).toBeFalsy();
  });

  it('should edit payment', () => {
    spyOn(component.edit, 'emit');
    spyOn(component, 'close');
    component.editedPayment = paymentMock;
    component.editPayment();
    expect(component.close).toHaveBeenCalled();
    expect(component.edit.emit).toHaveBeenCalledWith(paymentMock);
  });
});
