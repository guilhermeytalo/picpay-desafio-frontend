import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BASE_URL } from "src/app/constants/global"
import { User } from "../models/user"

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${BASE_URL}/account`)
  }

  register(user: User) {
    return this.http.post(`${BASE_URL}/users/register`, user)
  }

  delete(id: number) {
    return this.http.delete(`${BASE_URL}/users/${id}`)
  }
}
