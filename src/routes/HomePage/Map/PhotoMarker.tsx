import { Marker } from "react-mapbox-gl";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../store/selectors/user";

const TOOLTIP_ARROW_SIZE = 5;
const MARKER_SIZE = 96;

const PhotoMarker = ({ coordinates }: PhotoMarkerProps) => {
  const classes = useStyles();
  const { imageUrl } = useSelector(userInfoSelector) || {};

  return imageUrl ? (
    <Marker coordinates={coordinates}>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={imageUrl} />
        </Card>
      </div>
    </Marker>
  ) : null;
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

interface PhotoMarkerProps {
  coordinates: [number, number];
}

export default PhotoMarker;
