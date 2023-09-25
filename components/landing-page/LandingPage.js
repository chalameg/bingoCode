import React, { useContext, useEffect, useRef } from "react";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../../common/constants";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Bingo75 from "./Bingo75";
import Bingo90 from "./Bingo90";
import Header from "./Header";
import Profile from "./Profile";

import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import WelcomeBingo from "../auth/WelcomeBingo";
import Footer from "../footer/Footer";

function LandingPage() {
  const {
    crowdAudio,
    setCrowdAudio,
    isLoggedIn,
    setIsLoggedIn,
    setIsOnLandingPage,
    isSignupOpen,
    setIsSignupOpen,
    crowdWinAudio,
    setCrowdWinAudio,
    inBetweenAudio,
    setCrowdInBetweenAudio,
    setIsBgWhite,
  } = useContext(AppContext);

  const getCoinsRef = useRef(null);

  useEffect(() => {
    setIsBgWhite(false);
  }, []);

  useEffect(() => {
    if (crowdAudio) {
      crowdAudio.currentTime = 0;
      crowdAudio.pause();
      setCrowdAudio(null);
    }
  }, [crowdAudio, setCrowdAudio]);

  useEffect(() => {
    if (crowdWinAudio) {
      crowdWinAudio.currentTime = 0;
      crowdWinAudio.pause();
      setCrowdWinAudio(null);
    }
  }, [crowdWinAudio, setCrowdWinAudio]);

  useEffect(() => {
    if (inBetweenAudio) {
      inBetweenAudio.currentTime = 0;
      inBetweenAudio.pause();
      setCrowdInBetweenAudio(null);
    }
  }, [inBetweenAudio, setCrowdInBetweenAudio]);

  useEffect(() => {
    const sound = localStorage.getItem("soundEnabled");
    sound && localStorage.removeItem("soundEnabled");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(BINGO_ACCESS_TOKEN_KEY);
    localStorage.removeItem(BINGO_REFRESH_TOKEN_KEY);
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    setIsOnLandingPage(true);
  };

  const toggleForm = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  return (
    <div className={`${landingPageStyles.landingPage}`} id="landingpage">
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className={`${landingPageStyles.landingPageTop} ${landingPageStyles.bgGradient}`}
      >
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isSignUpOpen={isSignupOpen}
          toggleForm={toggleForm}
        />

        <div className={`${landingPageStyles.landingPageBody}`}>
          {isLoggedIn ? (
            <Profile getCoinsRef={getCoinsRef} />
          ) : (
            <WelcomeBingo />
          )}

          <Box
            className={`${landingPageStyles.bingosContainer}`}
            style={{ margin: "0 auto" }}
          >
            <Bingo90 />
            <Bingo75 />
          </Box>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
