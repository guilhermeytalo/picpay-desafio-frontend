import { AccountModel } from '@app/domain/models/account.model';
import faker from 'faker';
import LocalStorageService from './local-storage.service';

describe('LocalStorageTest', () => {
  it('should init service localStorage', () => {
    const service = new LocalStorageService();
    expect(service).toBeTruthy();
  });
  it('should set Object on localStorage', () => {
    const service = new LocalStorageService();
    const mockObjUser: AccountModel = {
      id: faker.datatype.number(10),
      email: faker.internet.email(),
      name: faker.internet.userName()
    };
    service.set(mockObjUser);
    const getUser = window.localStorage.getItem('user');
    expect(getUser).not.toBeNull();
  });
});
