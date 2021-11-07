import { useState, useRef } from "react";
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
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import HomeIcon from "@material-ui/icons/Home";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SideMenu from "../SideMenu";
import DropDownMenu from "../DropDownMenu";
import { themeTypeSelector } from "../../store/selectors/theme";
import { setTheme } from "../../store/theme/slice";
import { userInfoSelector } from "../../store/selectors/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const toolbarRef = useRef(null);
  const themeType = useSelector(themeTypeSelector);
  const user = useSelector(userInfoSelector);
  const isThemeDark = themeType === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropDownAnchorEl, setDropDownAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const onDropDownMenuOpen = () => setDropDownAnchorEl(toolbarRef.current);

  const onDropDownMenuClose = () => setDropDownAnchorEl(null);

  return (
    <AppBar position="static">
      <Toolbar ref={toolbarRef}>
        <SideMenu
          isMenuOpen={isMenuOpen}
          onMenuClose={() => setIsMenuOpen(false)}
          onMenuOpen={() => setIsMenuOpen(true)}
        />
        <DropDownMenu
          anchorEl={dropDownAnchorEl}
          onClose={onDropDownMenuClose}
        />
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <IconButton onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid
              className={classes.buttonGroup}
              container
              alignItems="center"
              spacing={2}
            >
              {!isMobile && (
                <>
                  <Grid item>
                    <IconButton component={Link} to="/">
                      <HomeIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Tooltip
                      arrow
                      title={`Switch to ${
                        isThemeDark ? "light" : "dark"
                      } theme`}
                    >
                      <IconButton
                        onClick={() =>
                          dispatch(setTheme(isThemeDark ? "light" : "dark"))
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
                </>
              )}
              {user?.email ? (
                <>
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Avatar
                          src={user.imageUrl}
                          className={classes.profileAvatar}
                        />
                      </Grid>
                      <Grid item>
                        <Typography color="textPrimary">
                          {user.userName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={onDropDownMenuOpen}>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>
                    <Button component={Link} to="/login">
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to="/register">
                      Sign up
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    buttonGroup: {
      width: "auto",
    },
    profileAvatar: {
      height: 32,
      width: 32,
    },
  })
);

export default NavBar;
