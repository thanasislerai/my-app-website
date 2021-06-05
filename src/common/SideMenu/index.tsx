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
  PaletteType,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";

const SideMenu = ({
  isMenuOpen,
  themeType,
  onMenuOpen,
  onMenuClose,
  handleThemeTypeChange,
  classes,
}: SideMenuProps) => {
  const isThemeDark = themeType === "dark";

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
        <ListItem
          button
          onClick={() => {
            handleThemeTypeChange(isThemeDark ? "light" : "dark");
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
        <ListItem button onClick={onMenuClose} component={Link} to="/login">
          <ListItemAvatar>
            <ExitToAppIcon />
          </ListItemAvatar>
          <ListItemText>SIGN IN</ListItemText>
        </ListItem>
        <ListItem button onClick={onMenuClose}>
          <ListItemAvatar>
            <PersonAddIcon />
          </ListItemAvatar>
          <ListItemText>SIGN UP</ListItemText>
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
  themeType: PaletteType;
  onMenuOpen: () => void;
  onMenuClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleThemeTypeChange: (type: PaletteType) => void;
}

type SideMenuProps = SideMenuIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(SideMenu);
