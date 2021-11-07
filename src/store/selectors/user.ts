import { RootState } from "../configure";
import { UserState } from "../user/types";

export const userInfoSelector = (state: RootState): UserState["userInfo"] =>
  state.user.userInfo;

export const userLoadingSelector = (state: RootState): UserState["loading"] =>
  state.user.loading;

export const userErrorSelector = (state: RootState): UserState["error"] =>
  state.user.error;

export const firebaseUserLoadingSelector = (
  state: RootState
): UserState["firebaseUserLoading"] => state.user.firebaseUserLoading;
