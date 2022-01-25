import { TestBed } from '@angular/core/testing';
import { IHttpClient } from '@data/protocols/http-client';
import { of } from 'rxjs';
import faker from 'faker';
import { PaymentsService } from './payments.service';
import { PaymentModel } from '@domain/models/payment.model';

let paymentService: PaymentsService;
let httpService: jasmine.SpyObj<IHttpClient>;

describe('PaymentsService', () => {
  httpService = jasmine.createSpyObj('IHttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentsService,
        { provide: IHttpClient, useValue: httpService }
      ]
    });
    paymentService = TestBed.inject(PaymentsService);
    httpService = TestBed.inject(IHttpClient) as jasmine.SpyObj<IHttpClient>;
  });
  it('should init service', () => {
    expect(paymentService).toBeTruthy();
  });
  it('should return list method get', () => {
    const mockListPayments: PaymentModel[] = [
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
    const value: any = { totalCount: 2, mockListPayments };
    httpService.get.and.returnValue(of(value));
    paymentService.get().subscribe((res) => {
      expect(res).toBeDefined();
    });
  });
});
