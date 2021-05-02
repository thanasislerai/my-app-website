import { useState } from "react";
import { Box, Typography, Button, Fade } from "@material-ui/core";

import HomePageCards from "./Cards";
import FullScreenWrapper from "../../common/FullScreenWrapper";

const HomePage = () => {
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [startAnimationFinished, setStartAnimationFinished] = useState(false);

  const handleStartButtonClick = () => setStartButtonClicked(true);
  const handleStartAnimationFinish = () => setStartAnimationFinished(true);

  return (
    <FullScreenWrapper>
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
    </FullScreenWrapper>
  );
};

export default HomePage;
