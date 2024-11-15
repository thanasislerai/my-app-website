import app from "../firebase";
import requests from "../helpers/requests";
import { Photo, UserResponse } from "../store/user/types";

const signIn = (email: string, password: string) =>
  app?.auth().signInWithEmailAndPassword(email, password);

const signUp = (email: string, password: string) =>
  app?.auth().createUserWithEmailAndPassword(email, password);

const signOut = () => app?.auth().signOut();

const storeUser = (
  userName: string,
  email: string,
  firebaseUid: string,
  imageUrl?: string
) =>
  requests.send<UserResponse>({
    method: "POST",
    url: "user",
    data: {
      userName,
      email,
      imageUrl,
      firebaseUid,
    },
  });

const getSelf = (token?: string) =>
  requests.send<UserResponse>({
    method: "GET",
    url: "user/current",
    token,
  });

const getOwnPhotos = (token?: string) =>
  requests.send<Photo[]>({
    method: "GET",
    url: "photo/own",
    token,
  });

export default {
  signIn,
  signUp,
  signOut,
  storeUser,
  getSelf,
  getOwnPhotos,
};
