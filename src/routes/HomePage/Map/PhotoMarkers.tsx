import { Marker } from "react-mapbox-gl";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import { Photo } from "../../../store/user/types";

const TOOLTIP_ARROW_SIZE = 5;
const MARKER_SIZE = 96;

const PhotoMarkers = ({ photos }: PhotoMarkersProps) => {
  const classes = useStyles();

  if (!photos) {
    return null;
  }

  return (
    <>
      {photos.map(({ id, lat, lng, url }) => (
        <Marker key={id} coordinates={[lng, lat]}>
          <div className={classes.root}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={url} />
            </Card>
          </div>
        </Marker>
      ))}
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      top: "99%",
      left: "50%",
      marginLeft: -TOOLTIP_ARROW_SIZE,
      width: 0,
      height: 0,
      borderTop: `solid ${TOOLTIP_ARROW_SIZE}px white`,
      borderLeft: `solid ${TOOLTIP_ARROW_SIZE}px transparent`,
      borderRight: `solid ${TOOLTIP_ARROW_SIZE}px transparent`,
    },
  },
  card: {
    height: MARKER_SIZE,
    width: MARKER_SIZE,
    borderRadius: "50%",
    border: "2px solid white",
  },
  media: {
    height: "100%",
    width: "100%",
  },
}));

interface PhotoMarkersProps {
  photos?: Photo[];
}

export default PhotoMarkers;
