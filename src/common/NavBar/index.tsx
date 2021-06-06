import { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  IconButton,
  PaletteType,
  Tooltip,
  useTheme,
  useMediaQuery,
  createStyles,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import { Link } from "react-router-dom";

import SideMenu from "../SideMenu";

const NavBar = ({ themeType, handleThemeTypeChange, classes }: NavBarProps) => {
  const isThemeDark = themeType === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="static">
      <Toolbar>
        <SideMenu
          isMenuOpen={isMenuOpen}
          themeType={themeType}
          onMenuClose={() => setIsMenuOpen(false)}
          onMenuOpen={() => setIsMenuOpen(true)}
          handleThemeTypeChange={handleThemeTypeChange}
        />
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <IconButton onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
          {!isMobile && (
            <Grid item>
              <Grid
                className={classes.buttonGroup}
                container
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Tooltip
                    arrow
                    title={`Switch to ${isThemeDark ? "light" : "dark"} theme`}
                  >
                    <IconButton
                      onClick={() =>
                        handleThemeTypeChange(isThemeDark ? "light" : "dark")
                      }
                    >
                      {isThemeDark ? (
                        <Brightness7RoundedIcon />
                      ) : (
                        <Brightness4RoundedIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Button component={Link} to="/login">
                    Sign In
                  </Button>
                </Grid>
                <Grid item>
                  <Button>Sign up</Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

type NavBarIncomingProps = {
  themeType: PaletteType;
  // eslint-disable-next-line no-unused-vars
  handleThemeTypeChange: (type: PaletteType) => void;
};

const styles = () =>
  createStyles({
    buttonGroup: {
      width: "auto",
    },
  });

type NavBarProps = NavBarIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(NavBar);
