import { AccountModel } from '@app/domain/models/account.model';
import { ILocalStorage } from './interfaces/ilocalstorage';

export default class LocalStorageService implements ILocalStorage {
  set(item: AccountModel): void {
    const getUser = JSON.stringify(item);
    window.localStorage.setItem('user', getUser);
  }
}
