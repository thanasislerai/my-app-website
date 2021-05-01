import { useState } from "react";
import "./App.css";
import { PaletteType, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import theme from "./theme";
import NavBar from "./common/NavBar";
import HomePage from "./routes/HomePage";
import NotFound from "./common/NotFound";

function App() {
  const [themeType, setThemeType] = useState<PaletteType>("dark");

  const handleThemeTypeChange = (type: PaletteType) => setThemeType(type);

  return (
    <ThemeProvider theme={theme(themeType)}>
      <NavBar
        themeType={themeType}
        handleThemeTypeChange={handleThemeTypeChange}
      />
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
