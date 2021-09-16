import firebase from "firebase/app";

export interface User {
  email?: firebase.User["email"];
  token?: string;
}

export interface UserState {
  userInfo?: User;
  loading: boolean;
  error?: string | null;
}

export interface UserSignInParams {
  email: string;
  password: string;
}
