import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsAddComponent } from './payments-add.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('PaymentsAddComponent', () => {
  let component: PaymentsAddComponent;
  let fixture: ComponentFixture<PaymentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ PaymentsAddComponent ],
      providers: [{provide : MatDialogRef, useValue : {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
