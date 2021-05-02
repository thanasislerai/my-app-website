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
import green from "@material-ui/core/colors/green";

import FullScreenWrapper from "../../common/FullScreenWrapper";

const SignIn = ({ classes }: SignInProps) => {
  return (
    <FullScreenWrapper>
      <Container>
        <Typography color="textPrimary" variant="h5" gutterBottom>
          Sign in
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
              <Button
                className={classes.signInButton}
                fullWidth
                color="primary"
                variant="contained"
              >
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
    signInButton: {
      backgroundColor: green[600],

      "&:hover": {
        backgroundColor: green[800],
      },
    },
  });

type SignInProps = WithStyles<typeof styles>;

export default withStyles(styles)(SignIn);
