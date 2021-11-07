import {
  createTheme,
  PaletteType,
  responsiveFontSizes,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import { alpha } from "@material-ui/core/styles/colorManipulator";

const colors: Record<string, string> = {
  backgroundDark: "#0d1117",
  buttonSecondary: green[600],
  buttonSecondaryHover: green[800],
};

const theme = (type?: PaletteType) => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        type,
        primary: {
          main: type === "dark" ? blue[900] : blue[600],
        },
        background: {
          default: type === "dark" ? colors.backgroundDark : undefined,
        },
      },

      overrides: {
        MuiButton: {
          containedSecondary: {
            backgroundColor: colors.buttonSecondary,
            "&:hover": {
              backgroundColor: colors.buttonSecondaryHover,
              "@media (hover: none)": {
                backgroundColor: colors.buttonSecondary,
              },
            },
          },

          outlinedSecondary: {
            color: colors.buttonSecondary,
            border: `1px solid ${alpha(colors.buttonSecondary, 0.5)}`,

            "&:hover": {
              border: `1px solid ${colors.buttonSecondary}`,
              backgroundColor: alpha(colors.buttonSecondary, 0.08),
            },
          },
        },
      },
    })
  );
};

export default theme;
