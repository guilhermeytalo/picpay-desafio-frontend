import { TestBed } from '@angular/core/testing';
import { AuthenticationParams } from '@domain/usecases/authentication';
import { IHttpClient } from '../protocols/http-client';
import { AuthenticationService } from './authentication.service';
import faker from 'faker';
let authenticationService: AuthenticationService;
let httpService: jasmine.SpyObj<IHttpClient>;

describe('AuthenticationService', () => {
  const httpClientPostSpy = jasmine.createSpyObj('IHttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: IHttpClient, useValue: httpClientPostSpy }
      ]
    });
    authenticationService = TestBed.inject(AuthenticationService);
    httpService = TestBed.inject(IHttpClient) as jasmine.SpyObj<IHttpClient>;
  });
  it('should create service', () => {
    expect(authenticationService).toBeTruthy();
  });
  it('Should request auth with body', () => {
    const body: AuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    authenticationService.auth(body);
    expect(httpService.post).toHaveBeenCalled();
  });
});
