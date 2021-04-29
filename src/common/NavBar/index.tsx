import { AppBar, Button, Toolbar, Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button>Sign In</Button>
              </Grid>
              <Grid item>
                <Button>Sign up</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
