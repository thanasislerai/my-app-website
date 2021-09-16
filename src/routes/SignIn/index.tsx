import {
  Container,
  Button,
  Typography,
  TextField,
  Grid,
  createStyles,
  WithStyles,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FullScreenWrapper from "../../common/FullScreenWrapper";
import { UserSignInParams } from "../../store/user/types";
import {
  userInfoSelector,
  userLoadingSelector,
} from "../../store/selectors/user";
import { signInUser } from "../../store/user/slice";

const SignIn = ({ classes }: SignInProps) => {
  const dispatch = useDispatch();
  const user = useSelector(userInfoSelector);
  const loading = useSelector(userLoadingSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInParams>({});

  const onSignInFormSubmit = (signInParams: UserSignInParams) =>
    dispatch(signInUser(signInParams));

  return (
    <FullScreenWrapper>
      {user && <Redirect to="/" />}
      <Container className={classes.signInWrapper}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h5"
          gutterBottom
        >
          Sign In
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSignInFormSubmit)}
        >
          <Grid container justify="center">
            <Grid container spacing={3} item lg={4} md={5} sm={8} xs={11}>
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
                    "Sign in"
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

const styles = () =>
  createStyles({
    signInWrapper: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    form: {
      width: "100%",
    },
  });

type SignInProps = WithStyles<typeof styles>;

export default withStyles(styles)(SignIn);
