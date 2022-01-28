import { AccountModel } from "./../../auth/models/AccountModel";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private readonly URL_API = environment.URL_API;

  constructor(private http: HttpClient) {}

  updateAccount(model: AccountModel) {
    return this.http.put(`${this.URL_API}/account/${model.id}`, model);
  }
}
