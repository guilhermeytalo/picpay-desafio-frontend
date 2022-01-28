import { Router } from "@angular/router";
import { AccountModel } from "./../../models/AccountModel";
import { AccountStoreService } from "./account-store.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Subject } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private accountStore: AccountStoreService,
    private localStorageService: LocalStorageService
  ) {}

  private readonly URL_API = environment.URL_API;

  login(model: any) {
    const result = new Subject<boolean>();
    this.http
      .get<AccountModel>(
        `${this.URL_API}/account?email=${model.email}&password=${model.password}`
      )
      .subscribe(
        (resp) => {
          if (resp && resp[0] && resp[0].email) {
            this.accountStore.setAccountModel(resp[0]);
            result.next(true);
            result.complete();
          } else {
            result.next(false);
            result.complete();
          }
        },
        (error) => {
          result.next(false);
          result.complete();
        }
      );

    return result.asObservable();
  }

  signup(model: AccountModel) {
    const result = new Subject<boolean>();
    this.http.post(`${this.URL_API}/account`, model).subscribe(resp => {
      if(resp){
        result.next(true);
        result.complete();
      } else {
        result.next(false);
        result.complete();
      }
    }, error => {
      result.next(false);
      result.complete();
    });

    return result.asObservable();
  }

  logout() {
    this.localStorageService.clear();
    this.accountStore.clearAccountModel();
    this.router.navigateByUrl("/auth");
  }
}
