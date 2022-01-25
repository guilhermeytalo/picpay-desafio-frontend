import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaymentModel } from '@app/domain/models/payment.model';
import { IPayment } from '@app/domain/usecases/payments';
import { of } from 'rxjs';
import { PaymentsComponent } from './payments.component';
import faker from 'faker';

let fixture: ComponentFixture<PaymentsComponent>;
let component: PaymentsComponent;
let paymentsService: jasmine.SpyObj<IPayment>;
describe('PaymentsComponent', () => {
  paymentsService = jasmine.createSpyObj('PaymentService', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsComponent],
      providers: [{ provide: IPayment, useValue: paymentsService }]
    });
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    paymentsService = TestBed.inject(IPayment) as jasmine.SpyObj<IPayment>;
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should show spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.mat-progress-spinner'));
    expect(spinner).toBeDefined();
  });

  it('should hidden actions table ', () => {
    const spinner = fixture.debugElement.query(
      By.css('p-content__table__area__mat-table')
    );
    expect(spinner).toBeNull();
  });

  it('should show tables if return request list', () => {
    const mockListPaymenst: PaymentModel[] = [
      {
        id: faker.datatype.number(10),
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        title: faker.name.jobType(),
        value: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }),
        date: '2020-07-21T05:53:20Z',
        image: faker.image.image(),
        isPayed: faker.datatype.boolean()
      },
      {
        id: faker.datatype.number(10),
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        title: faker.name.jobType(),
        value: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }),
        date: '2020-07-21T05:53:20Z',
        image: faker.image.image(),
        isPayed: faker.datatype.boolean()
      }
    ];
    paymentsService.get.and.returnValue(of());
    const spinner = fixture.debugElement.query(
      By.css('p-content__table__area__mat-table')
    );
    expect(spinner).toBeDefined();
  });
});
