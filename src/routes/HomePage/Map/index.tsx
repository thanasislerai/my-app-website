import { useState } from "react";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import { MapEvent } from "react-mapbox-gl/lib/map-events";
import { LngLat, Map as MapboxMapType, MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

import NewPhotoPopup from "./NewPhotoPopup";
import PhotoMarkers from "./PhotoMarkers";
import RotationControl from "./RotationControl";
import { mapTiles } from "../../../constants/mapTiles";
import { themeTypeSelector } from "../../../store/selectors/theme";
import { userInfoSelector } from "../../../store/selectors/user";
import { Photo } from "../../../store/user/types";
import PhotoViewDialog from "../../../common/PhotoViewDialog";

const MapComponent = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_TOKEN || "",
});

const mapMouseEventWrapper = (
  eventCallback: (arg1: MapboxMapType, arg2: MapMouseEvent) => void
) => eventCallback as unknown as MapEvent;

const Map = () => {
  const user = useSelector(userInfoSelector);
  const themeType = useSelector(themeTypeSelector);
  const isThemeDark = themeType === "dark";
  const [angle, setAngle] = useState(0);
  const [newPhotoPopupPosition, setNewPhotoPopupPosition] = useState<LngLat>();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();

  const onMapRotate = (map: MapboxMapType) => {
    setAngle(map.getBearing());
  };

  const onAngleReset = () => setAngle(0);

  const onMapClick = (map: MapboxMapType, event: MapMouseEvent) => {
    const currentZoom = map.getZoom();
    const { lngLat: center } = event;
    map.flyTo({
      center,
      animate: true,
      duration: 2000,
      zoom: Math.max(currentZoom, 10),
    });
    setNewPhotoPopupPosition(center);
  };

  const onNewPhotoPopupClose = () => setNewPhotoPopupPosition(undefined);

  const onViewPhotoDialogClose = () => setSelectedPhoto(undefined);

  return (
    <>
      <PhotoViewDialog photo={selectedPhoto} onClose={onViewPhotoDialogClose} />
      <MapComponent
        onRotate={onMapRotate}
        style={isThemeDark ? mapTiles.dark : mapTiles.light}
        bearing={[angle]}
        containerStyle={{ height: "100%", width: "100%" }}
        onClick={mapMouseEventWrapper(onMapClick)}
      >
        <ZoomControl />
        <PhotoMarkers photos={user?.photos} onMarkerClick={setSelectedPhoto} />
        <NewPhotoPopup
          position={newPhotoPopupPosition}
          onClose={onNewPhotoPopupClose}
        />
        <RotationControl angle={angle} onClick={onAngleReset} />
      </MapComponent>
    </>
  );
};

export default Map;
