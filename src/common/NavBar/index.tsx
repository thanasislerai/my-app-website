import { useState, useContext } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

import SideMenu from "../SideMenu";
import ThemeContext from "../../contexts/ThemeContext";
import UserContext from "../../contexts/UserContext";

const NavBar = ({ classes }: NavBarProps) => {
  const { themeType, handleThemeTypeChange } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const isThemeDark = themeType === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="static">
      <Toolbar>
        <SideMenu
          isMenuOpen={isMenuOpen}
          onMenuClose={() => setIsMenuOpen(false)}
          onMenuOpen={() => setIsMenuOpen(true)}
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
                  <IconButton component={Link} to="/">
                    <HomeIcon />
                  </IconButton>
                </Grid>
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
                {user?.email ? (
                  <Grid item>
                    <Typography color="textPrimary">
                      Hi, {user.email.split("@")?.[0]}
                    </Typography>
                  </Grid>
                ) : (
                  <>
                    <Grid item>
                      <Button component={Link} to="/login">
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button>Sign up</Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const styles = () =>
  createStyles({
    buttonGroup: {
      width: "auto",
    },
  });

type NavBarProps = WithStyles<typeof styles>;

export default withStyles(styles)(NavBar);
