import { useState } from "react";

import FullScreenWrapper from "../../common/FullScreenWrapper";
import HomePageCards from "./Cards";
import Welcome from "./Welcome";

const HomePage = () => {
  const [startButtonClicked, setStartButtonClicked] = useState(false);

  return (
    <FullScreenWrapper>
      {startButtonClicked ? (
        <HomePageCards />
      ) : (
        <Welcome onStartButtonClick={() => setStartButtonClicked(true)} />
      )}
    </FullScreenWrapper>
  );
};

export default HomePage;
