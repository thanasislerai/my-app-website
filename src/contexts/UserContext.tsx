import { createContext, useState, useEffect, FC } from "react";
import firebase from "firebase/app";

import app from "../firebase";

interface User {
  email?: firebase.User["email"];
}

interface UserContextType {
  user?: User;
  setUser: (arg?: User) => void;
}

const UserContext = createContext<UserContextType>({
  setUser: () => {},
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    app?.auth().onAuthStateChanged((signedInUser) => {
      // There is a signed in user
      if (signedInUser) {
        setUser({ email: signedInUser.email });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
