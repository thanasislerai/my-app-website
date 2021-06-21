import { createContext, FC, useState } from "react";
import {
  PaletteType,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";
import theme from "../theme";

interface ThemeContextType {
  themeType: PaletteType;
  handleThemeTypeChange: (arg: PaletteType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeType: "dark",
  handleThemeTypeChange: () => {},
});

export const ThemeProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = useState<PaletteType>("dark");

  const handleThemeTypeChange = (type: PaletteType) => setThemeType(type);

  return (
    <ThemeContext.Provider value={{ themeType, handleThemeTypeChange }}>
      <MuiThemeProvider theme={theme(themeType)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
