import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
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
