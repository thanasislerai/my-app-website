import { useState } from "react";

import FullScreenWrapper from "../../common/FullScreenWrapper";
import Welcome from "./Welcome";
import Map from "./Map";

const HomePage = () => {
  const [startButtonClicked, setStartButtonClicked] = useState(false);

  return (
    <FullScreenWrapper>
      {startButtonClicked ? (
        <Map />
      ) : (
        <Welcome onStartButtonClick={() => setStartButtonClicked(true)} />
      )}
    </FullScreenWrapper>
  );
};

export default HomePage;
