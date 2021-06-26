import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import NavBar from "./common/NavBar";
import HomePage from "./routes/HomePage";
import NotFound from "./common/NotFound";
import SignIn from "./routes/SignIn";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
