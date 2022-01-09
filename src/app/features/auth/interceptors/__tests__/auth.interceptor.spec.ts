import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from '../auth.interceptor';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from '../../auth.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { doesNotReject } from 'assert';

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

  it('should intercept request', () => {
    spyOn(authService, 'hasToken').and.returnValue(true);
    paymentsService.get().subscribe(res => {
      expect(res).toBeTruthy();
    });
  });


});
