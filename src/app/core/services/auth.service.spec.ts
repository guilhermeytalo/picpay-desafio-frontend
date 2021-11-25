import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { UserAccount } from '../models/user-account.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockApiService: ApiService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useFactory: () => instance(mockApiService)
        },
        {
          provide: Router,
          useFactory: () => instance(mockRouter)
        }
      ]
    });
  });

  beforeEach(() => {
    mockApiService = mock(ApiService);
    mockRouter = mock(Router);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('authenticated should call user endpoint', () => {
    let userAccount: UserAccount = {
      id: 0,
      email: 'email@email.com',
      name: 'Teste',
      password: '123'
    };
    when(mockApiService.get(anything(), anything(), anything())).thenReturn(of([userAccount]));
    service.authenticate({ email: 'email@email.com', password: '123' }).subscribe(data => {
      expect(data).toEqual(userAccount);
      service.getUserData().subscribe(userData => expect(userData).toEqual(userAccount));
      service.isAuthenticated().subscribe(data => expect(data).toBeTruthy());
    });
  });

  it('authenticated should call user endpoint and return error if not found', () => {
    when(mockApiService.get(anything(), anything(), anything())).thenReturn(of(null));
    service.authenticate({ email: 'email@email.com', password: '123' }).subscribe(
      () => {
        fail();
      },
      err => expect(err).toEqual(new HttpErrorResponse({ status: 404, error: 'Email ou senha incorretos' }))
    );
  });

  it('isAuthenticated should get token from session storage', () => {
    sessionStorage.setItem(
      'token_key',
      'eyJpZCI6MCwibmFtZSI6InVzdWFyaW8iLCJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJ1c3VhcmlvIn0='
    );
    spyOn(sessionStorage, 'getItem').and.callThrough();
    service.isAuthenticated().subscribe(data => expect(data).toBeTruthy());
  });

  it('logout should clear token', () => {
    spyOn((service as any).userData, 'next');
    spyOn(sessionStorage, 'removeItem').and.callThrough();
    service.logout();
    verify(mockRouter.navigate(anything())).once();
    expect((service as any).userData.next).toHaveBeenCalledOnceWith(null);
    expect(sessionStorage.removeItem).toHaveBeenCalledOnceWith('token_key');
  });

  it('updateUserData should call data update', () => {
    let data = {
      id: 1,
      email: 'teste@teste',
      password: '123',
      name: 'aaa'
    };
    spyOn((service as any).userData, 'next');
    spyOn(sessionStorage, 'setItem').and.callThrough();
    service.updateUserData(data);
    expect(sessionStorage.setItem).toHaveBeenCalledOnceWith('token_key', btoa(JSON.stringify(data)));
    expect((service as any).userData.next).toHaveBeenCalledOnceWith(data);
  });
});
