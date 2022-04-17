import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import CloseOutlined from "@material-ui/icons/CloseOutlined";

import { Photo } from "../../store/user/types";

const PhotoViewDialog = ({ photo, onClose }: PhotoViewDialogProps) => {
  const classes = useStyles();
  const isOpen = typeof photo !== "undefined";

  return (
    <Dialog maxWidth="md" fullWidth open={isOpen} onClose={onClose}>
      {photo?.title && (
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h4">{photo.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent className={classes.dialogContent}>
        <img className={classes.image} src={photo?.url} alt="selected-img" />
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    borderBottom: `1px solid ${grey[700]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogContent: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2, 3),
    "&:first-child": {
      padding: theme.spacing(2, 3),
    },
  },
  image: {
    maxWidth: "100%",
    maxHeight: "calc(100vh - 64px)",
  },
}));

interface PhotoViewDialogProps {
  photo?: Photo;
  onClose: () => void;
}

export default PhotoViewDialog;
