import { AccountModel } from '@app/domain/models/account.model';
import { ILocalStorage } from './interfaces/ilocalstorage';

export default class LocalStorageService implements ILocalStorage {
  deleteToken(): void {
    window.localStorage.removeItem('user');
  }
  checkIfExistsUser(): boolean {
    return window.localStorage.getItem('user') ? true : false;
  }
  set(item: AccountModel): void {
    const getUser = JSON.stringify(item);
    window.localStorage.setItem('user', getUser);
  }
}
