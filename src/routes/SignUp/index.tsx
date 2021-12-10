import { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Avatar,
  Theme,
  useTheme,
  useMediaQuery,
  TextFieldProps,
  IconButton,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { ImageListType } from "react-images-uploading";

import {
  firebaseUserLoadingSelector,
  userErrorSelector,
  userInfoSelector,
  userLoadingSelector,
} from "../../store/selectors/user";
import { UserSignUpParams } from "../../store/user/types";
import { clearError, signUpUser } from "../../store/user/slice";
import FullScreenWrapper from "../../common/FullScreenWrapper";
import ImageUpload from "../../common/ImageUpload";

const PROFILE_AVATAR_SIZE = 120;
const MOBILE_TO_DESKTOP_RATIO = 5 / 6;

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(userInfoSelector);
  const loading = useSelector(userLoadingSelector);
  const error = useSelector(userErrorSelector);
  const firebaseUserLoading = useSelector(firebaseUserLoadingSelector);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<ImageListType>([]);
  const textFieldSize: TextFieldProps["size"] = isMobile ? "small" : "medium";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpParams>({});

  const onSignUpFormSubmit = (signUpParams: UserSignUpParams) =>
    dispatch(signUpUser(signUpParams));

  const handleErrorAlertClose = () => {
    setIsErrorAlertOpen(false);
    dispatch(clearError());
  };

  const onProfilePicDelete = () => setProfilePic([]);

  useEffect(() => {
    if (error) {
      setIsErrorAlertOpen(true);
    }
  }, [error]);

  return (
    <FullScreenWrapper>
      <Snackbar
        open={isErrorAlertOpen}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={handleErrorAlertClose}
      >
        <Alert onClose={handleErrorAlertClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {(user || firebaseUserLoading) && <Redirect to="/" />}
      <Container className={classes.signUpWrapper}>
        <div className={classes.profileAvatarWrapper}>
          <Avatar
            className={classes.profileAvatar}
            src={profilePic?.[0]?.dataURL}
          />
          {profilePic.length > 0 && (
            <IconButton
              className={classes.profileAvatarDeleteButton}
              onClick={onProfilePicDelete}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSignUpFormSubmit)}
        >
          <Grid container justifyContent="center">
            <Grid container spacing={3} item lg={4} md={5} sm={8} xs={11}>
              <Grid item xs={12}>
                <TextField
                  {...register("userName", {
                    required: "This is a required field",
                    validate: (value) => !isEmpty(value) || "Invalid username",
                  })}
                  fullWidth
                  size={textFieldSize}
                  label="Username"
                  variant="outlined"
                  error={!!errors.userName?.message}
                  helperText={errors.userName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "This is a required field",
                    validate: (value) => isEmail(value) || "Invalid email",
                  })}
                  fullWidth
                  size={textFieldSize}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "This is a required field",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                      message:
                        "Your password needs to include both lower and upper case characters and at least one number",
                    },
                  })}
                  fullWidth
                  size={textFieldSize}
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUpload
                  className={classes.imageUpload}
                  images={profilePic}
                  onImagesChange={setProfilePic}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      thickness={2.4}
                      color="primary"
                    />
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FullScreenWrapper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signUpWrapper: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },

    form: {
      width: "100%",
    },
    profileAvatarWrapper: {
      position: "relative",
      marginBottom: theme.spacing(3),
    },
    profileAvatar: {
      height: PROFILE_AVATAR_SIZE,
      width: PROFILE_AVATAR_SIZE,
      [theme.breakpoints.down("xs")]: {
        height: MOBILE_TO_DESKTOP_RATIO * PROFILE_AVATAR_SIZE,
        width: MOBILE_TO_DESKTOP_RATIO * PROFILE_AVATAR_SIZE,
      },
    },
    profileAvatarDeleteButton: {
      backgroundColor: red[700],
      position: "absolute",
      top: 80,
      left: 75,
      "&:hover": {
        backgroundColor: red[900],
      },
      [theme.breakpoints.down("xs")]: {
        top: 65,
        left: 60,
      },
    },
    imageUpload: {
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(4, 2),
      },
    },
  })
);

export default SignUp;
