import { TestBed } from '@angular/core/testing';

import { LoginService } from '../login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should auth user', done => {
    service.auth({ user: 'test', password: 'pass' }).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    })
  });
});
