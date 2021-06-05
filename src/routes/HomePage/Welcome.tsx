import { Box, Button, Typography } from "@material-ui/core";

const Welcome = ({ onStartButtonClick }: WelcomeProps) => {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography align="center" color="textPrimary" variant="h2" gutterBottom>
        Welcome!!
      </Typography>
      <Button onClick={onStartButtonClick} variant="contained" color="primary">
        Start Journey
      </Button>
    </Box>
  );
};

interface WelcomeProps {
  onStartButtonClick: () => void;
}

export default Welcome;
