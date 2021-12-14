import { action, makeObservable, observable } from 'mobx';
import { login } from '../../../models/auth/requests';
import { Login, User } from './types';

class AuthStore {
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      login: action,
      logout: action,
      hasUser: action,
    });
  }

  async login(data: Login) {
    const response: User = await login(data);
    this.user = response;
    localStorage.setItem('@payfriend:user', JSON.stringify(this.user));
  }

  logout() {
    localStorage.removeItem('@payfriend:user');
    this.user = null;
  }

  hasUser() {
    const user = localStorage.getItem('@payfriend:user');
    if (user) {
      this.user = JSON.parse(user);
      return true;
    }
    return false;
  }
}

export default AuthStore;
