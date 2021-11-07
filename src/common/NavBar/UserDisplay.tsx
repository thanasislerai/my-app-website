import React from "react";
import { Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useSelector } from "react-redux";

import {
  firebaseUserLoadingSelector,
  userInfoSelector,
  userLoadingSelector,
} from "../../store/selectors/user";

const PROFILE_AVATAR_WIDTH = 32;
const PROFILE_AVATAR_HEIGHT = 32;

const UserDisplay = ({ onDropDownMenuOpen }: UserDisplayProps) => {
  const classes = useStyles();
  const user = useSelector(userInfoSelector);
  const userLoading = useSelector(userLoadingSelector);
  const firebaseUserLoading = useSelector(firebaseUserLoadingSelector);

  if (firebaseUserLoading || userLoading) {
    return (
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Skeleton
              variant="circle"
              height={PROFILE_AVATAR_HEIGHT}
              width={PROFILE_AVATAR_WIDTH}
            />
          </Grid>
          <Grid item>
            <Skeleton
              className={classes.userNameSkeleton}
              variant="rect"
              width={128}
              height={24}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (user) {
    return (
      <>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Avatar src={user.imageUrl} className={classes.profileAvatar} />
            </Grid>
            <Grid item>
              <Typography color="textPrimary">{user.userName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton onClick={onDropDownMenuOpen}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </>
    );
  }

  return (
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
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    profileAvatar: {
      height: PROFILE_AVATAR_HEIGHT,
      width: PROFILE_AVATAR_WIDTH,
    },
    userNameSkeleton: {
      borderRadius: 4,
    },
  })
);

interface UserDisplayProps {
  onDropDownMenuOpen: () => void;
}

export default UserDisplay;
