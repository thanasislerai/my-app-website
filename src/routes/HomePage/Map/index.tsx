import { useState } from "react";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import { Map as MapboxMapType } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

import { mapTiles } from "../../../constants/mapTiles";
import RotationControl from "./RotationControl";
import { themeTypeSelector } from "../../../store/selectors/theme";

const MapComponent = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_TOKEN || "",
});

const Map = () => {
  const themeType = useSelector(themeTypeSelector);
  const isThemeDark = themeType === "dark";
  const [angle, setAngle] = useState(0);

  const onMapRotate = (map: MapboxMapType) => {
    setAngle(map.getBearing());
  };

  const onAngleReset = () => setAngle(0);

  return (
    <MapComponent
      onRotate={onMapRotate}
      style={isThemeDark ? mapTiles.dark : mapTiles.light}
      bearing={[angle]}
      containerStyle={{ height: "100%", width: "100%" }}
    >
      <ZoomControl />
      <RotationControl angle={angle} onClick={onAngleReset} />
    </MapComponent>
  );
};

export default Map;
