import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from '../auth.interceptor';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { AuthModule } from '@/features/auth/auth.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@/features/auth/services/auth.service';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const request: HttpRequest<any> = new HttpRequest('GET', '/', { observe: 'response' });
const handler: HttpHandler = {
  handle: (_) => of({ headers: _.headers } as HttpHeaderResponse)
};


describe('HttpInterceptorService', () => {
  let paymentsService: PaymentsService;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        PaymentsService,
        AuthInterceptor
      ]
    });
    paymentsService = TestBed.inject(PaymentsService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept request', waitForAsync(() => {
    spyOn(authService, 'hasToken').and.returnValue(false);

    interceptor.intercept(request, handler);

    expect(authService.hasToken).toHaveBeenCalled();
  }));

  it('should intercept request', waitForAsync(() => {
    spyOn(authService, 'hasToken').and.returnValue(true);
    spyOn(authService, 'getToken').and.returnValue('test-token');

    interceptor.intercept(request, handler);

    expect(authService.hasToken).toHaveBeenCalled();
    expect(authService.getToken).toHaveBeenCalled();
  }));

});
