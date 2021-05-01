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
          main: blue[900],
        },
        background: {
          default: "#0d1117",
        },
      },
    })
  );

export default theme;
