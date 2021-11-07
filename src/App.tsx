import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import app from "./firebase";
import NavBar from "./common/NavBar";
import HomePage from "./routes/HomePage";
import NotFound from "./common/NotFound";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import theme from "./theme";
import { themeTypeSelector } from "./store/selectors/theme";
import { getSelf, setFirebaseUserLoading } from "./store/user/slice";

function App() {
  const themeType = useSelector(themeTypeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFirebaseUserLoading(true));
    if (app) {
      app.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          user.getIdToken().then((token) => {
            dispatch(getSelf(token));
          });
        }
        dispatch(setFirebaseUserLoading(false));
      });
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme(themeType)}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
