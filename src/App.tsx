import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import theme from "./theme";
import NavBar from "./common/NavBar";
import HomePage from "./routes/HomePage";
import NotFound from "./common/NotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
