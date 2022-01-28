import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { User } from "../models/user"
import { REGISTERED_USERS } from "../constants/global"
import { ToastService } from "./toast.service"
import { throwError } from "rxjs"

let users = JSON.parse(localStorage.getItem(REGISTERED_USERS)) || []

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getAll() {
    return this.http.get<User[]>("http://localhost:3000/account")
  }

  register(user: User) {
    const hasAccount = users.find((u: User) => u.email === user.email)

    if (!hasAccount) {
      return this.http.post<User>("http://localhost:3000/account", user)
    }

    const message = 'Esse email "' + user.email + '" já possui cadastro'
    return throwError(message)
  }

  update(user: User) {
    try {
      return this.http.put(`http://localhost:3000/account/${user.id}`, user)
    } catch (error) {
      const message = "Erro ao atualizar os dados."
      return throwError(message)
    }
  }
}
