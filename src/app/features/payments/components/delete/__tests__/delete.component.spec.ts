import { PopupModule } from '@/components/popup/popup.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { paymentMock } from 'src/_mock/payments.mock';

import { DeleteComponent } from '../delete.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupModule],
      declarations: [DeleteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    component.payment = paymentMock;
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

});
