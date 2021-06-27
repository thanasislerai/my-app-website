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
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { red } from "@material-ui/core/colors";
import userServices from "../../services/userServices";
import UserContext from "../../contexts/UserContext";

const DropDownMenu = ({ anchorEl, onClose, classes }: DropDownMenuProps) => {
  const { setUser } = useContext(UserContext);

  const onUserSignOut = () => {
    userServices
      .signOut()
      .then(() => {
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
    >
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
  });

interface DropDownMenuIncomingProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

type DropDownMenuProps = DropDownMenuIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(DropDownMenu);
