/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountStoreService } from './account-store.service';

describe('Service: AccountStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountStoreService]
    });
  });

  it('should ...', inject([AccountStoreService], (service: AccountStoreService) => {
    expect(service).toBeTruthy();
  }));
});
