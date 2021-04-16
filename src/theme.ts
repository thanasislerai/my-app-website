import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      text: {
        primary: "#000000",
        secondary: "#ffffff"
      },
    },
  })
);

export default theme;
