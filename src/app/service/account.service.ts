import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { map, tap } from "rxjs/operators"
import { User } from "../models/user"

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private url: string = `http://localhost:3000`

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login({ email, password }) {
    return this.http.post<any>(`${this.url}/account`, { email, password }).pipe(
      map(user => {
        window.localStorage.setItem("currentUser", JSON.stringify(user))
        window.localStorage.setItem("token", "meu-token")

        this.currentUserSubject.next(user)
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }
}
