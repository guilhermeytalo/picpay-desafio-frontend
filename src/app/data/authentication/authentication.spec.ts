import { TestBed } from '@angular/core/testing';
import { AuthenticationParams } from '@domain/usecases/authentication';
import { IHttpClient } from '../protocols/http-client';
import { AuthenticationService } from './authentication.service';
import faker from 'faker';
import { of } from 'rxjs';
import { AccountModel } from '@app/domain/models/account.model';
let authenticationService: AuthenticationService;
let httpService: jasmine.SpyObj<IHttpClient>;

const createParams = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};
const createObjResponseAccount = (): AccountModel => {
  return {
    id: faker.datatype.number(10),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};
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

  it('Should request auth with error', () => {
    const body: AuthenticationParams = createParams();
    const ret: AccountModel = createObjResponseAccount();
    httpService.get.and.returnValue(of(ret));
    authenticationService.auth(body);
    expect(httpService.get).toHaveBeenCalled();
  });
});
