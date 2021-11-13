import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  alpha,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";

const colors: Record<string, string> = {
  backgroundDark: "#0d1117",
  buttonSecondary: green[600],
  buttonSecondaryHover: green[800],
};

const theme = (mode?: PaletteMode) => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? blue[900] : blue[600],
        },
        background: {
          default: mode === "dark" ? colors.backgroundDark : undefined,
        },
      },

      components: {
        MuiButton: {
          styleOverrides: {
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
      },
    })
  );
};

export default theme;
