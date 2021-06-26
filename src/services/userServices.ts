import app from "../firebase";

const signIn = (email: string, password: string) =>
  app.auth().signInWithEmailAndPassword(email, password);

export default {
  signIn,
};
