import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  Theme,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import { red } from "@material-ui/core/colors";

import { signOutUser } from "../../store/user/slice";

const DropDownMenu = ({ anchorEl, onClose }: DropDownMenuProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUserSignOut = () => {
    dispatch(signOutUser());
    onClose();
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

const useStyles = makeStyles((theme: Theme) =>
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
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
  })
);

interface DropDownMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default DropDownMenu;
