import { IconButton, createStyles, makeStyles } from "@material-ui/core";
import { ReactComponent as Compass } from "../../../assets/icons/compass.svg";

const RotationControl = ({ angle, onClick }: RotationControlProps) => {
  const classes = useStyles({ angle });
  return (
    <IconButton
      onClick={onClick}
      className={classes.root}
      classes={{ label: classes.buttonLabel }}
    >
      <Compass className={classes.icon} />
    </IconButton>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: ({ angle }: RotationControlStylingProps) => ({
      position: "absolute",
      right: 0,
      top: 80,
      zIndex: 10,
      padding: 10,
      transform: `rotate(calc(-45deg - ${angle}deg))`,
    }),
    buttonLabel: {
      borderRadius: "50%",
    },
    icon: {
      height: 28,
      width: 28,
    },
  })
);

interface RotationControlProps {
  angle: number;
  onClick: () => void;
}

interface RotationControlStylingProps {
  angle: number;
}

export default RotationControl;
