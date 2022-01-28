import { AccountModel } from "./../models/AccountModel";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAccountModel = createSelector(
  createFeatureSelector("accountEntries"),
  (state: AccountModel) => {
    return state;
  }
);

export const isAuthenticated = createSelector(
  createFeatureSelector("accountEntries"),
  (state: AccountModel) => {
    if (state.email) {
      return true;
    } else {
      return false;
    }
  }
);
