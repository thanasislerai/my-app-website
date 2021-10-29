import { useState } from "react";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import { MapEvent } from "react-mapbox-gl/lib/map-events";
import { LngLat, Map as MapboxMapType, MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

import NewPhotoPopup from "./NewPhotoPopup";
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
  const [newPhotoPopupPosition, setNewPhotoPopupPosition] = useState<LngLat>();

  const onMapRotate = (map: MapboxMapType) => {
    setAngle(map.getBearing());
  };

  const onAngleReset = () => setAngle(0);

  const onMapClick = (map: MapboxMapType, event: MapMouseEvent) => {
    const currentZoom = map.getZoom();
    const center = event.lngLat;
    map.flyTo({
      center,
      animate: true,
      duration: 2000,
      zoom: Math.max(currentZoom, 10),
    });
    setNewPhotoPopupPosition(center);
  };

  const onNewPhotoPopupClose = () => setNewPhotoPopupPosition(undefined);

  return (
    <MapComponent
      onRotate={onMapRotate}
      style={isThemeDark ? mapTiles.dark : mapTiles.light}
      bearing={[angle]}
      containerStyle={{ height: "100%", width: "100%" }}
      onClick={onMapClick as unknown as MapEvent}
    >
      <ZoomControl />
      <NewPhotoPopup
        position={newPhotoPopupPosition}
        onClose={onNewPhotoPopupClose}
      />
      <RotationControl angle={angle} onClick={onAngleReset} />
    </MapComponent>
  );
};

export default Map;
