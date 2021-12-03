import { HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

import { ILogin } from '../../models/login/login.interface';
import { CrudService } from './../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAutenthicated: boolean = false;

  showHeaderMenuEmitter = new EventEmitter<boolean>()

  constructor(
    private _crudService: CrudService,
    private _router: Router
  ) { }

  login({ email, password }: ILogin) : Observable<User[]>{
    const params = new HttpParams().set('email', email).set('password', password);

    return this._crudService.get<User[]>('account', params);
  }

  isAuthenticated(){
    if (localStorage.getItem('token_app')) {
        this.setLogged(true);
        return true;
    }

    this.setLogged(false);
    return false
  }

  setLogged(logged: boolean){
    this.showHeaderMenuEmitter.emit(logged);
  }

  logout(){
    console.log('Logout Service auth');
    this.setLogged(false);
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
