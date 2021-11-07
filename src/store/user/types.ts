import firebase from "firebase/app";

export interface User {
  userName?: string;
  email?: firebase.User["email"];
  token?: string;
  imageUrl?: string;
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

export interface UserSignUpParams {
  userName: string;
  email: string;
  password: string;
  imageUrl?: string;
}
