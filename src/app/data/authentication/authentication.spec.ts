import { TestBed } from '@angular/core/testing';
import { AuthenticationParams } from '@domain/usecases/authentication';
import { IHttpClient } from '../protocols/http-client';
import { AuthenticationService } from './authentication.service';
import faker from 'faker';
import { of } from 'rxjs';
let authenticationService: AuthenticationService;
let httpService: jasmine.SpyObj<IHttpClient>;

describe('AuthenticationService', () => {
  const httpClient = jasmine.createSpyObj('IHttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: IHttpClient, useValue: httpClient }
      ]
    });
    authenticationService = TestBed.inject(AuthenticationService);
    httpService = TestBed.inject(IHttpClient) as jasmine.SpyObj<IHttpClient>;
  });
  it('should create service', () => {
    expect(authenticationService).toBeTruthy();
  });
  it('Should request auth', () => {
    const body: AuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    httpService.get.and.returnValue(of());
    authenticationService.auth(body);
    expect(httpService.get).toHaveBeenCalled();
  });
});
