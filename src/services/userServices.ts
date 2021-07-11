import app from "../firebase";

const signIn = (email: string, password: string) =>
  app?.auth().signInWithEmailAndPassword(email, password);

const signOut = () => app?.auth().signOut();

export default {
  signIn,
  signOut,
};
