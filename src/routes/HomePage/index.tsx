import { useState } from "react";

import FullScreenWrapper from "../../common/FullScreenWrapper";
import Welcome from "./Welcome";
import Map from "./Map";
import {
  getLocalStorageItem,
  localStorageKeys,
  setLocalStorageItem,
} from "../../constants/localStorage";

const HomePage = () => {
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(
    getLocalStorageItem(localStorageKeys.IS_HOMEPAGE_START_BUTTON_CLICKED) ===
      "true"
  );

  const onStartButtonClick = () => {
    setIsStartButtonClicked(true);
    setLocalStorageItem(
      localStorageKeys.IS_HOMEPAGE_START_BUTTON_CLICKED,
      "true"
    );
  };

  return (
    <FullScreenWrapper>
      {isStartButtonClicked ? (
        <Map />
      ) : (
        <Welcome onStartButtonClick={onStartButtonClick} />
      )}
    </FullScreenWrapper>
  );
};

export default HomePage;
