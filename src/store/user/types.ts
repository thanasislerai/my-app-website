import firebase from "firebase/app";

export interface Photo {
  id: string;
  title?: string;
  url: string;
  userId: string;
  lat: number;
  lng: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  userName: string;
  email: firebase.User["email"];
  token?: string;
  imageUrl?: string;
  firebaseUid: string;
  photos: Photo[];
}

export interface UserState {
  userInfo?: User;
  loading: boolean;
  error?: string | null;
  firebaseUserLoading?: boolean;
}

export interface UserSignInParams {
  email: string;
  password: string;
}

export interface UserSignUpParams {
  userName: string;
  email: string;
  password: string;
  profilePic?: File;
}

export interface UserResponse {
  _id: string;
  userName: string;
  email: string;
  imageUrl?: string;
  firebaseUid: string;
}
