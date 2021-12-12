import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { PROFILE_PICTURES_PATH } from "../../firebase";
import { handleFileUpload } from "../../helpers/uploads";
import userServices from "../../services/userServices";
import type { CreateAsyncThunkTypes } from "../configure";

import { UserSignInParams, UserSignUpParams, UserState } from "./types";
import { constructUserObject } from "./utils";

const userInitialState: UserState = {
  loading: false,
};

export const signInUser = createAsyncThunk<
  UserState["userInfo"],
  UserSignInParams,
  CreateAsyncThunkTypes
>("user/signIn", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = (await userServices.signIn(email, password)) || {};
    const token = await user?.getIdToken();
    const { data: storedUser } = await userServices.getSelf(token);

    return constructUserObject(storedUser, token);
  } catch (err: any) {
    const error: AxiosError<UserState["error"]> = err;
    return rejectWithValue(error.message);
  }
});

export const signUpUser = createAsyncThunk<
  UserState["userInfo"],
  UserSignUpParams,
  CreateAsyncThunkTypes
>(
  "user/signUp",
  async ({ email, password, userName, profilePic }, { rejectWithValue }) => {
    try {
      const { user: firebaseUser } =
        (await userServices.signUp(email, password)) || {};
      const token = await firebaseUser?.getIdToken();
      const firebaseUid = firebaseUser?.uid as string;
      const imageUrl = await handleFileUpload({
        file: profilePic,
        folder: `${PROFILE_PICTURES_PATH}/${firebaseUid}`,
      });
      const { data: storedUser } = await userServices.storeUser(
        userName,
        email,
        firebaseUid,
        imageUrl
      );

      return constructUserObject(storedUser, token);
    } catch (err: any) {
      const error: AxiosError<UserState["error"]> = err;
      return rejectWithValue(error.message);
    }
  }
);

export const getSelf = createAsyncThunk<
  UserState["userInfo"],
  string,
  CreateAsyncThunkTypes
>(
  "user/getSelf",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data: userData } = await userServices.getSelf(token);

      return constructUserObject(userData, token);
    } catch (err: any) {
      const error: AxiosError<UserState["error"]> = err;
      return rejectWithValue(error.message);
    }
  },
  {
    // If another user action is pending, cancel this request before it starts.
    condition(arg: string, { getState }) {
      const {
        user: { loading },
      } = getState();
      return !loading;
    },
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
    setFirebaseUserLoading: (
      state,
      action: PayloadAction<UserState["firebaseUserLoading"]>
    ) => ({ ...state, firebaseUserLoading: action.payload }),
    setUser: (state, action: PayloadAction<UserState["userInfo"]>) => ({
      ...state,
      userInfo: action.payload,
    }),
    clearError: (state) => ({ ...state, error: undefined }),
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

    // User sign up
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<UserState["userInfo"]>) => ({
        ...state,
        userInfo: action.payload,
        loading: false,
      })
    );

    builder.addCase(signUpUser.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    builder.addCase(
      signUpUser.rejected,
      (state, action: PayloadAction<UserState["error"]>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      }
    );

    // Get self
    builder.addCase(
      getSelf.fulfilled,
      (state, action: PayloadAction<UserState["userInfo"]>) => ({
        ...state,
        userInfo: action.payload,
        loading: false,
      })
    );

    builder.addCase(getSelf.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    builder.addCase(
      getSelf.rejected,
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

export const { setFirebaseUserLoading, setUser, clearError } =
  userSlice.actions;

export default userSlice.reducer;
