import { useContext } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Divider,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import { red } from "@material-ui/core/colors";
import userServices from "../../services/userServices";
import UserContext from "../../contexts/UserContext";

const DropDownMenu = ({ anchorEl, onClose, classes }: DropDownMenuProps) => {
  const { setUser } = useContext(UserContext);

  const onUserSignOut = () => {
    userServices
      .signOut()
      ?.then(() => {
        setUser();
        onClose();
      })
      .catch(console.error);
  };

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      classes={{
        list: classes.dropdownList,
        paper: classes.dropdownListWrapper,
      }}
    >
      <MenuItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>View Profile</ListItemText>
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuItem button className={classes.menuItem} onClick={onUserSignOut}>
        <ListItemIcon className={classes.menuItemIcon}>
          <PowerSettingsNewIcon
            className={classes.signOutIcon}
            fontSize="small"
          />
        </ListItemIcon>
        <ListItemText>Log Out</ListItemText>
      </MenuItem>
    </Menu>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    menuItem: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },

    menuItemIcon: {
      minWidth: 40,
    },

    signOutIcon: {
      color: red[500],
    },

    dropdownListWrapper: {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    dropdownList: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },

    divider: {
      backgroundColor: fade(theme.palette.primary.main, 0.5),
    },
  });

interface DropDownMenuIncomingProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

type DropDownMenuProps = DropDownMenuIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(DropDownMenu);
