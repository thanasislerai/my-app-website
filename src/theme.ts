import {
  createMuiTheme,
  PaletteType,
  responsiveFontSizes,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const colors: Record<string, string> = {
  darkBackground: "#0d1117",
};

const theme = (type?: PaletteType) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        type,
        primary: {
          main: type === "dark" ? blue[900] : blue[600],
        },
        background: {
          default: type === "dark" ? colors.darkBackground : undefined,
        },
      },
    })
  );

export default theme;
