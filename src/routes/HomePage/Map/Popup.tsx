import { Popup as MapboxPopup } from "react-mapbox-gl";
import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardHeader,
  PaletteType,
} from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { LngLat } from "mapbox-gl";
import { useSelector } from "react-redux";
import { themeTypeSelector } from "../../../store/selectors/theme";

const Popup = ({ position }: PopupProps) => {
  const themeType = useSelector(themeTypeSelector);
  const classes = useStyles({ themeType });
  const { lat, lng } = position || {};

  return lat && lng ? (
    <MapboxPopup
      anchor="bottom"
      className={classes.popupWrapper}
      coordinates={[lng, lat]}
    >
      <Card className={classes.popup}>
        <CardHeader
          title="What happened here?"
          subheader="Is there a good memory you would like to add here?"
          titleTypographyProps={{ variant: "h6" }}
          subheaderTypographyProps={{ variant: "subtitle2" }}
        />
      </Card>
    </MapboxPopup>
  ) : null;
};

const BORDER_RADIUS = 4;
const LIGHT_BACKGROUND_COLOR = "white";
const DARK_BACKGROUND_COLOR = blueGrey[900];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
    },
    popupWrapper: ({ themeType }: { themeType: PaletteType }) => ({
      "& > :first-child": {
        // The first of this wrapper is the default mapbox pupup tip,
        // whose styles we want to override.
        borderTopColor:
          themeType === "dark" ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR,
      },
      "& > :last-child": {
        // The last child of this wrapper is the default mapbox pupup content,
        // whose styles we want to override.
        padding: 0,
        borderRadius: BORDER_RADIUS,
        backgroundColor:
          themeType === "dark" ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR,
      },
    }),
    popup: ({ themeType }: { themeType: PaletteType }) => ({
      maxWidth: "70vw",
      borderRadius: BORDER_RADIUS,
      backgroundColor:
        themeType === "dark" ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR,
    }),
  })
);

interface PopupProps {
  position?: LngLat;
}

export default Popup;
