import { TestBed } from '@angular/core/testing';

import { MeusPagamentosGuardService } from './meus-pagamentos-guard.service';

describe('MeusPagamentosGuardService', () => {
  let service: MeusPagamentosGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusPagamentosGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
