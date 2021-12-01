import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReadComponent } from './payment-read.component';

describe('PaymentReadComponent', () => {
  let component: PaymentReadComponent;
  let fixture: ComponentFixture<PaymentReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
