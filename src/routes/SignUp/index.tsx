import { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import {
  firebaseUserLoadingSelector,
  userErrorSelector,
  userInfoSelector,
  userLoadingSelector,
} from "../../store/selectors/user";
import { UserSignUpParams } from "../../store/user/types";
import { clearError, signUpUser } from "../../store/user/slice";
import FullScreenWrapper from "../../common/FullScreenWrapper";

const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(userInfoSelector);
  const loading = useSelector(userLoadingSelector);
  const error = useSelector(userErrorSelector);
  const firebaseUserLoading = useSelector(firebaseUserLoadingSelector);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
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
        <Typography
          align="center"
          color="textPrimary"
          variant="h5"
          gutterBottom
        >
          Sign Up
        </Typography>
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
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

const useStyles = makeStyles(() =>
  createStyles({
    signUpWrapper: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    form: {
      width: "100%",
    },
  })
);

export default SignUp;
