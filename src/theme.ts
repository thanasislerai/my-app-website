import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: blue[900],
      },
      background: {
        default: "#0d1117",
      },
      text: {
        primary: "#000000",
        secondary: "#ffffff",
      },
    },
  })
);

export default theme;
