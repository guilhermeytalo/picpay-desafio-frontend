import { AccountModel } from "./../models/AccountModel";
import { createAction, props } from "@ngrx/store";

export const accountModelAction = createAction(
  "AccountModelAction",
  props<{ model: AccountModel }>()
);

export const accountModelClearAction = createAction(
  "AccountModelClearAction"
);
