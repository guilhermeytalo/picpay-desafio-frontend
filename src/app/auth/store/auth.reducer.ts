import { AccountModel } from "./../models/AccountModel";
import { accountModelAction, accountModelClearAction } from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

const initialStateAccountModel: AccountModel = {
  id: 0,
  name: "",
  email: "",
  password: "",
};

export const AccountModelReducer = createReducer(
  initialStateAccountModel,
  on(accountModelAction, (state, { model }) => {
    return { ...state, ...model };
  }),
  on(accountModelClearAction, (_) => initialStateAccountModel)
);
