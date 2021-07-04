import { useContext } from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { mapTiles } from "../../constants/mapTiles";
import ThemeContext from "../../contexts/ThemeContext";

const Map = ({ classes }: MapProps) => {
  const { REACT_APP_MAPBOX_API_TOKEN: accessToken } = process.env;
  const { themeType } = useContext(ThemeContext);
  const isThemeDark = themeType === "dark";

  if (!accessToken) {
    return null;
  }

  const MapComponent = ReactMapboxGl({
    accessToken,
    dragRotate: false,
  });

  return (
    <MapComponent
      className={classes.map}
      style={isThemeDark ? mapTiles.dark : mapTiles.light}
    >
      <ZoomControl />
    </MapComponent>
  );
};

const styles = () =>
  createStyles({
    map: {
      height: "100%",
    },
  });

interface MapIncomingProps {}

type MapProps = MapIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(Map);
