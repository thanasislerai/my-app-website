import {
  SwipeableDrawer,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { themeTypeSelector } from "../../store/selectors/theme";
import { setTheme } from "../../store/theme/slice";
import { signOutUser } from "../../store/user/slice";
import { userInfoSelector } from "../../store/selectors/user";

const SideMenu = ({
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
  classes,
}: SideMenuProps) => {
  const dispatch = useDispatch();
  const user = useSelector(userInfoSelector);
  const themeType = useSelector(themeTypeSelector);
  const isThemeDark = themeType === "dark";

  const onUserSignOut = () => {
    dispatch(signOutUser());
    onMenuClose();
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={isMenuOpen}
      onOpen={onMenuOpen}
      onClose={onMenuClose}
      classes={{ paper: classes.root }}
    >
      <Grid container justify="flex-end">
        <Grid item>
          <IconButton onClick={onMenuClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        <ListItem button onClick={onMenuClose} component={Link} to="/">
          <ListItemAvatar>
            <HomeIcon />
          </ListItemAvatar>
          <ListItemText>HOME</ListItemText>
        </ListItem>
        {user?.email ? (
          <ListItem button onClick={onUserSignOut}>
            <ListItemAvatar>
              <PowerSettingsNewIcon />
            </ListItemAvatar>
            <ListItemText>LOG OUT</ListItemText>
          </ListItem>
        ) : (
          <>
            <ListItem button onClick={onMenuClose} component={Link} to="/login">
              <ListItemAvatar>
                <ExitToAppIcon />
              </ListItemAvatar>
              <ListItemText>SIGN IN</ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={onMenuClose}
              component={Link}
              to="/register"
            >
              <ListItemAvatar>
                <PersonAddIcon />
              </ListItemAvatar>
              <ListItemText>SIGN UP</ListItemText>
            </ListItem>
          </>
        )}
        <ListItem
          button
          onClick={() => {
            dispatch(setTheme(isThemeDark ? "light" : "dark"));
            onMenuClose();
          }}
        >
          <ListItemAvatar>
            {themeType === "dark" ? (
              <Brightness7RoundedIcon />
            ) : (
              <Brightness4RoundedIcon />
            )}
          </ListItemAvatar>
          <ListItemText>
            USE {themeType === "dark" ? "LIGHT" : "DARK"} THEME
          </ListItemText>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      minWidth: 240,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
    },
  });

interface SideMenuIncomingProps {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

type SideMenuProps = SideMenuIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(SideMenu);
