import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsRemoveComponent } from './payments-remove.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('PaymentsRemoveComponent', () => {
  let component: PaymentsRemoveComponent;
  let fixture: ComponentFixture<PaymentsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsRemoveComponent ],
      imports: [MatDialogModule],
      providers: [{provide : MatDialogRef, useValue : {}}, {provide : MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
