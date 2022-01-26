import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TablePaymentsComponent } from '@app/presentation/components/table-payments/table-payments.component';
import { PaymentsComponent } from './payments.component';

let fixture: ComponentFixture<PaymentsComponent>;
let component: PaymentsComponent;
describe('PaymentsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
