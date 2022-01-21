import { API } from "./../../../share/constant/constants";
import { Auth } from "./auth.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAccount(): Observable<Auth> {
    return this.http.get<Auth>(`${API}/account`);
  }
}
