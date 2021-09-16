import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import userServices from "../../services/userServices";
import type { CreateAsyncThunkTypes } from "../configure";

import { UserSignInParams, UserState } from "./types";

const userInitialState: UserState = {
  loading: false,
};

export const signInUser = createAsyncThunk<
  UserState["userInfo"],
  UserSignInParams,
  CreateAsyncThunkTypes
>(
  "user/signIn",
  async ({ email, password }: UserSignInParams, { rejectWithValue }) => {
    try {
      const { user } = (await userServices.signIn(email, password)) || {};
      const token = await user?.getIdToken();

      return { email: user?.email, token };
    } catch (err: any) {
      const error: AxiosError<UserState["error"]> = err;
      return rejectWithValue(error.message);
    }
  }
);

export const signOutUser = createAsyncThunk<
  UserState["userInfo"],
  undefined,
  CreateAsyncThunkTypes
>("user/signOut", async (_, { rejectWithValue }) => {
  try {
    await userServices.signOut();
    return undefined;
  } catch (err: any) {
    const error: AxiosError<UserState["error"]> = err;
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["userInfo"]>) => ({
      ...state,
      userInfo: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // User sign in
    builder.addCase(
      signInUser.fulfilled,
      (state, action: PayloadAction<UserState["userInfo"]>) => ({
        ...state,
        userInfo: action.payload,
        loading: false,
      })
    );

    builder.addCase(signInUser.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    builder.addCase(
      signInUser.rejected,
      (state, action: PayloadAction<UserState["error"]>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      }
    );

    // User sign out
    builder.addCase(
      signOutUser.fulfilled,
      (state, action: PayloadAction<UserState["userInfo"]>) => ({
        ...state,
        userInfo: action.payload,
        loading: false,
      })
    );

    builder.addCase(signOutUser.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    builder.addCase(
      signOutUser.rejected,
      (state, action: PayloadAction<UserState["error"]>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      }
    );
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
