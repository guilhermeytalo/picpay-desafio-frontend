import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { access } from 'fs';
import { of } from 'rxjs';
import { STORAGE_TOKEN_KEY } from 'src/_config/constants';
import { UserAuthRequest, UserAuthResponse } from '../../models/user-auth.model';

import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
  });


  beforeEach(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if has token', () => {
    expect(service.hasToken()).toBeFalsy();
    localStorage.setItem(STORAGE_TOKEN_KEY, 'teste-token');
    expect(service.hasToken()).toBeTruthy();
  });

  it('should get token', () => {
    service.setToken('teste-token');
    expect(service.getToken()).toEqual('teste-token');
  });

  it('should logout', () => {
    spyOn(router, 'navigate');
    service.setToken('teste-token');
    service.logout();
    expect(service.hasToken()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should auth', () => {
    spyOn(httpClient, 'post').and.returnValue(of({ body: { access_token: 'token-test' } }));

    service.auth({} as UserAuthRequest).subscribe(res => {
      expect(service.hasToken).toBeTruthy();
    });
  });

});

