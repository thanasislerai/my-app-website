import {
  Card,
  CardActionArea,
  Container,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  createStyles,
  Typography,
  withStyles,
  WithStyles,
  Grid,
} from "@material-ui/core";

import athensImage from "../../assets/images/athens.jpg";

const HomePageCards = ({ classes }: HomePageCardsProps) => (
  <Container className={classes.root}>
    <Grid container spacing={4}>
      <Grid item md={4} sm={6} xs={12}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={athensImage}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                align="justify"
                gutterBottom
                variant="h5"
                component="h2"
              >
                Athens
              </Typography>
              <Typography
                align="justify"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Athens is the capital and largest city of Greece. Athens
                dominates the Attica region and is one of the world&#39;s oldest
                cities, with its recorded history spanning over 3,400 years and
                its earliest human presence started somewhere between the 11th
                and 7th millennium BC.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant="outlined" size="small">
              Share
            </Button>
            <Button variant="outlined" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

const styles = () =>
  createStyles({
    root: {
      marginTop: 32,
      marginBottom: 32,
    },
    card: {
      minHeight: 400,
    },
    media: {
      height: 180,
    },
  });

type HomePageCardsProps = WithStyles<typeof styles>;

export default withStyles(styles)(HomePageCards);
