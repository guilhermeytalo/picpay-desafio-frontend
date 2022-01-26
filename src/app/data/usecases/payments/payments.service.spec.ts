import { TestBed } from '@angular/core/testing';
import { IHttpClient } from '@data/protocols/http-client';
import { of } from 'rxjs';
import faker from 'faker';
import { PaymentsService } from './payments.service';
import { PaymentModel } from '@domain/models/payment.model';
import { PaymentsPostParams } from '@app/domain/models/payment-params.model';
import { Routes } from '@app/shared/helpers/router-helper';

let paymentService: PaymentsService;
let httpService: jasmine.SpyObj<IHttpClient>;

describe('PaymentsService', () => {
  httpService = jasmine.createSpyObj('IHttpClient', [
    'get',
    'post',
    'put',
    'delete'
  ]);
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
  it('should request post with body', () => {
    const mockParams: PaymentsPostParams = {
      data: '2020-07-21T05:53:20Z',
      title: faker.name.jobType(),
      username: faker.internet.userName(),
      value: faker.datatype.float({ min: 10, max: 100, precision: 0.1 })
    };
    httpService.post.withArgs(Routes.payment, mockParams).and.returnValue(of());
    paymentService.addPayment(mockParams);
    expect(httpService.post).toHaveBeenCalled();
  });
  it('should request put with body', () => {
    const mockParams: PaymentsPostParams = {
      data: '2020-07-21T05:53:20Z',
      title: faker.name.jobType(),
      username: faker.internet.userName(),
      value: faker.datatype.float({ min: 10, max: 100, precision: 0.1 })
    };
    httpService.put
      .withArgs(Routes.paymentPerId(1), mockParams)
      .and.returnValue(of());
    paymentService.editPayment(1, mockParams);
    expect(httpService.put).toHaveBeenCalled();
  });

  it('should request delete with id', () => {
    httpService.delete.withArgs(Routes.paymentPerId(1)).and.returnValue(of());
    paymentService.deletePayment(1);
    expect(httpService.delete).toHaveBeenCalled();
  });
});
