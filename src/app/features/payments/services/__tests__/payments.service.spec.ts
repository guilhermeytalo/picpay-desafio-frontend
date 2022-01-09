import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { paymentMock } from 'src/_mock/payments.mock';

import { PaymentsService } from '../payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PaymentsService]
    });
    service = TestBed.inject(PaymentsService);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get payments page count', waitForAsync(() => {
    service.getPaymentsPageCount(of([paymentMock, paymentMock, paymentMock, paymentMock, paymentMock, paymentMock]), 2)
      .subscribe(pageCount => {
        expect(pageCount).toEqual(3);
      });
  }));

  it('should get payments page count', waitForAsync(() => {
    service.getPaymentsPageCount(of([paymentMock, paymentMock, paymentMock, paymentMock, paymentMock, paymentMock]))
      .subscribe(pageCount => {
        expect(pageCount).toEqual(2);
      });
  }));

  it('should delete payment', waitForAsync(() => {
    spyOn(httpClient, 'delete').and.returnValue(of(paymentMock));

    service.delete(paymentMock.id).subscribe(payment => {
      expect(httpClient.delete).toHaveBeenCalled();
      expect(payment.name).toEqual(paymentMock.name);
    });
  }));

  it('should edit payment', waitForAsync(() => {
    spyOn(httpClient, 'patch').and.returnValue(of(paymentMock));

    service.update(paymentMock).subscribe(payment => {
      expect(httpClient.patch).toHaveBeenCalled();
      expect(payment.name).toEqual(paymentMock.name);
    });
  }));

  it('should create payment', waitForAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(of(paymentMock));

    service.create(paymentMock).subscribe(payment => {
      expect(httpClient.post).toHaveBeenCalled();
      expect(payment.name).toEqual(paymentMock.name);
    });
  }));
});
