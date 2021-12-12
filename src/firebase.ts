import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
} = process.env;

if (!apiKey) {
  console.warn(
    "No Firebase API Key provided. Please set up Firebase to use login and admin functionalities."
  );
}

const app = apiKey
  ? firebase.initializeApp({
      apiKey,
      storageBucket,
    })
  : undefined;

export const PROFILE_PICTURES_PATH = "images/profile";

export const storage = storageBucket ? firebase.storage() : undefined;

export default app;
