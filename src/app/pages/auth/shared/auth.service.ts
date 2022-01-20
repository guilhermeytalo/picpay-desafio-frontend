import { Auth } from "./auth.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAccount(): Observable<Auth> {
    return this.http.get<Auth>(`http://localhost:3000/account`);
  }
}
