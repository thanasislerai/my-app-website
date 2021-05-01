import {
  createMuiTheme,
  PaletteType,
  responsiveFontSizes,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = (type?: PaletteType) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        type,
        primary: {
          main: type === "dark" ? blue[900] : blue[600],
        },
        background: {
          default: type === "dark" ? "#0d1117" : undefined,
        },
      },
    })
  );

export default theme;
