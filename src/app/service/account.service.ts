import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, throwError, of } from "rxjs"
import { map } from "rxjs/operators"
import { User } from "../models/user"
import { AlertService } from "./alert.service"
import { UserService } from "./user.service"

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private url: string = `http://localhost:3000`

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient, public alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login({ email, password }) {
    try {
      return this.http.post<any>(`${this.url}/users/authenticate`, { email, password }).pipe(
        map(user => {
          window.localStorage.setItem("token", "meu-token")
          this.currentUserSubject.next(user)
          return user
        })
      )
    } catch (error) {
      console.log("✅ ~ error", error)
    }

    // const registeredUsers = allUsers.find(x => x.email === email && x.password === password)

    // if (!registeredUsers) return throwError({ message: "Email ou senha incorretos." })

    // const body = {
    //   id: 0,
    //   email: email,
    //   token: "fake-jwt-token",
    // }

    // window.localStorage.setItem("currentUser", JSON.stringify(body))
    // window.localStorage.setItem("token", "meu-token")
    // this.currentUserSubject.next(body)

    // return of(new HttpResponse({ status: 200, body }))
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }
}
