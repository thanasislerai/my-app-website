import {
  Container,
  Button,
  Typography,
  TextField,
  Grid,
  createStyles,
  WithStyles,
  withStyles,
} from "@material-ui/core";

import FullScreenWrapper from "../../common/FullScreenWrapper";

const SignIn = ({ classes }: SignInProps) => {
  return (
    <FullScreenWrapper>
      <Container className={classes.signInWrapper}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h5"
          gutterBottom
        >
          Sign In
        </Typography>
        <Grid container justify="center">
          <Grid container spacing={3} item lg={3} md={5} sm={8} xs={11}>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth color="secondary" variant="contained">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
  });

type SignInProps = WithStyles<typeof styles>;

export default withStyles(styles)(SignIn);
