import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  IconButton,
  PaletteType,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import { Link } from "react-router-dom";

const NavBar = ({ themeType, handleThemeTypeChange }: NavBarIncomingProps) => {
  const isThemeDark = themeType === "dark";

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
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

export default NavBar;
