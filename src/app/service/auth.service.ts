import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { User } from "../models/user"
import { ToastService } from "./toast.service"
import { AUTH_JWT_TOKEN, JWT_TOKEN, BASE_URL, AUTH_USER } from "src/app/constants/global"
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient, public alertService: ToastService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(AUTH_USER)))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login({ email, password }) {
    return this.http.post<any>(`${BASE_URL}/users/authenticate`, { email, password }).pipe(
      map(user => {
        window.localStorage.setItem(AUTH_USER, JSON.stringify(user))
        window.localStorage.setItem(AUTH_JWT_TOKEN, JWT_TOKEN)
        this.currentUserSubject.next(user)
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem(AUTH_USER)
    localStorage.removeItem(AUTH_JWT_TOKEN)
    this.currentUserSubject.next(null)
  }
}
