import ImageUploading, { ImageListType } from "react-images-uploading";
import classNames from "classnames";
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Typography,
} from "@material-ui/core";

const MAX_FILE_SIZE_MB = 10;
const ACCEPT_TYPE = ["jpg", "png"];

const ImageUpload = ({
  className,
  images,
  onImagesChange,
}: ImageUploadProps) => {
  const classes = useStyles();

  return (
    <ImageUploading
      value={images}
      onChange={onImagesChange}
      maxFileSize={MAX_FILE_SIZE_MB * 10 ** 6}
      acceptType={ACCEPT_TYPE}
    >
      {({ dragProps, onImageUpload, errors }) => (
        <>
          <Button
            fullWidth
            onClick={onImageUpload}
            className={classNames(className, classes.fileDrop)}
            color="primary"
            variant="outlined"
            classes={{ label: classes.fileDropLabel }}
            {...dragProps}
          >
            <Typography variant="subtitle1">Upload profile picture</Typography>
            <Typography variant="subtitle2">
              Only {ACCEPT_TYPE.map((type) => `.${type}`).join(", ")} files up
              to {MAX_FILE_SIZE_MB}MB are accepted.
            </Typography>
          </Button>
          {errors?.maxFileSize && (
            <Typography
              align="center"
              variant="subtitle2"
              className={classes.errorText}
            >
              Profile picture must be {MAX_FILE_SIZE_MB}MB or less
            </Typography>
          )}
          {errors?.acceptType && (
            <Typography
              align="center"
              variant="subtitle2"
              className={classes.errorText}
            >
              Only {ACCEPT_TYPE.map((type) => `.${type}`).join(", ")} files are
              accepted.
            </Typography>
          )}
        </>
      )}
    </ImageUploading>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
    },
    fileDrop: {
      borderStyle: "dashed",
      padding: theme.spacing(6, 2),
      borderRadius: 4,
      textTransform: "none",
      "&:hover": {
        borderStyle: "dashed",
      },
    },
    fileDropLabel: {
      display: "flex",
      flexDirection: "column",
    },
    errorText: {
      color: theme.palette.error.dark,
    },
  })
);

interface ImageUploadProps {
  className?: string;
  images: ImageListType;
  onImagesChange: (arg: ImageListType) => void;
}

export default ImageUpload;
