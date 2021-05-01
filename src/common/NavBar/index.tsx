import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  IconButton,
  PaletteType,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";

const NavBar = ({ themeType, handleThemeTypeChange }: NavBarIncomingProps) => {
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
                <IconButton
                  onClick={() =>
                    handleThemeTypeChange(
                      themeType === "dark" ? "light" : "dark"
                    )
                  }
                >
                  {themeType === "dark" ? (
                    <Brightness7RoundedIcon />
                  ) : (
                    <Brightness4RoundedIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <Button>Sign In</Button>
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
