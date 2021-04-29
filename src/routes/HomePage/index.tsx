import { useState } from "react";
import { Box, Typography, Button, useTheme, Fade } from "@material-ui/core";

import HomePageCards from "./Cards";

const HomePage = () => {
  const theme = useTheme();
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [startAnimationFinished, setStartAnimationFinished] = useState(false);

  const handleStartButtonClick = () => setStartButtonClicked(true);
  const handleStartAnimationFinish = () => setStartAnimationFinished(true);

  return (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor={theme.palette.background.default}
    >
      <Fade
        disableStrictModeCompat
        in={!startButtonClicked}
        timeout={1000}
        unmountOnExit
        onExited={handleStartAnimationFinish}
      >
        <Box>
          <Typography color="textPrimary" variant="h2" gutterBottom>
            Welcome!!
          </Typography>
          <Button
            onClick={handleStartButtonClick}
            variant="contained"
            color="primary"
          >
            Start Journey
          </Button>
        </Box>
      </Fade>
      {startAnimationFinished && (
        <Fade in={startAnimationFinished} timeout={1000}>
          <HomePageCards />
        </Fade>
      )}
    </Box>
  );
};

export default HomePage;
