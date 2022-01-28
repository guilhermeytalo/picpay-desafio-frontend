import { AccountModel } from "./../../models/AccountModel";
import {
  accountModelAction,
  accountModelClearAction,
} from "./../../store/auth.actions";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAccountModel } from "../../store/auth.selectors";

@Injectable({
  providedIn: "root",
})
export class AccountStoreService {
  constructor(private store: Store) {}

  getAccountModel() {
    var accountModel: AccountModel = null;
    this.store.select(selectAccountModel).subscribe((state) => {
      accountModel = state;
    });
    return accountModel;
  }

  setAccountModel(accountModel: AccountModel) {
    this.store.dispatch(accountModelAction({ model: accountModel }));
  }

  clearAccountModel() {
    this.store.dispatch(accountModelClearAction());
  }
}
