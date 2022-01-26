import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { User } from "../models/user"
import { AlertService } from "./alert.service"
import { AUTH_TOKEN, KEY_TOKEN, BASE_URL, CURRENT_USER } from "src/app/constants/global"
@Injectable({
  providedIn: "root",
})
export class AccountService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient, public alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(CURRENT_USER)))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login({ email, password }) {
    return this.http.post<any>(`${BASE_URL}/users/authenticate`, { email, password }).pipe(
      map(user => {
        const token = KEY_TOKEN
        window.localStorage.setItem(AUTH_TOKEN, token)
        this.currentUserSubject.next(user)
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem(CURRENT_USER)
    this.currentUserSubject.next(null)
  }
}
