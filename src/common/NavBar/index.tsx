import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  IconButton,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  Theme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = ({ classes }: NavBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <IconButton className={classes.menuIcon}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button>
                  <Typography color="textSecondary" variant="subtitle2">
                    Sign in
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  <Typography color="textSecondary" variant="subtitle2">
                    Sign up
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    menuIcon: {
      color: theme.palette.text.secondary,
    },
  });

type NavBarProps = WithStyles<typeof styles>;

export default withStyles(styles)(NavBar);
