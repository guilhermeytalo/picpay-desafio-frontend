import { PopupModule } from '@/components/popup/popup.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { paymentMock } from 'src/_mock/payments.mock';

import { CreateComponent } from '../create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PopupModule
      ],
      declarations: [CreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
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
    component.payment = paymentMock;
    component.close();
    expect(component.isVisible).toBeFalsy();
    expect(component.payment).toEqual({ name: '', username: '', date: '', value: 0, title: '' });
  });

  it('should create payment', () => {
    spyOn(component.create, 'emit');
    spyOn(component, 'close');
    component.payment = paymentMock;
    component.createPayment();
    expect(component.close).toHaveBeenCalled();
    expect(component.create.emit).toHaveBeenCalledWith(paymentMock);
  });
});
