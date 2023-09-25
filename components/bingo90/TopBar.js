import React, { useState, useContext } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import SoundControl from "./UI/SoundControl";
import Profile from "./UI/Profile";
import {
  leftTopBar,
  topBar,
  centerTopBar,
  fullScreenIcon,
  playersCount,
  playersCountIcon,
  fullScreenContainer,
  playersCountContainer
} from "../../styles/bingo90/index.module.scss";
import { Bingo90Context } from "../../common/context";
import { Groups } from "@mui/icons-material";

function MobileTopBar({
  children,
  bingo90winAudio,
  bingo90crowdAudio,
  bingo90InBetween,
  inBetween,
  playWin,
}) {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false);
  const { messageData, isWon } = useContext(Bingo90Context);

  const makePageFullScreen = () => {
    if (document.fullscreenEnabled) {
      if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
      } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      } else if (document.body.requestFullscreen) {
        document.body
          .requestFullscreen({ navigationUI: "show" })
          .then(() => {})
          .catch(() => {}); // standard
      }
      setIsFullscreenEnabled(true);
    }
  };

  const exitFullScreen = () => {
    document.exitFullscreen();
    setIsFullscreenEnabled(false);
  };

  return (
    <div className={` ${topBar}`}>
      <div className={` ${leftTopBar}`}>
        <SoundControl
          bingo90winAudio={bingo90winAudio}
          bingo90crowdAudio={bingo90crowdAudio}
          bingo90InBetween={bingo90InBetween}
          inBetween={inBetween}
          playWin={playWin}
        />
        <div key={Math.random()} className={` ${fullScreenContainer}`}>
          {isFullscreenEnabled ? (
            <div onClick={exitFullScreen} style={{zIndex:"1400"}}>
              <AiOutlineFullscreenExit className={`${fullScreenIcon}`} />
            </div>
          ) : (
            <div onClick={makePageFullScreen} style={{zIndex:"1400"}}>
              <BsArrowsFullscreen className={`${fullScreenIcon}`} />
            </div>
          )}
        </div>
        <div >
          <span
            key={Math.random()}
            title={"Players"}
            className={playersCountContainer}
          >
            <span className={`${playersCount}`}>
              {messageData.playersCount}
            </span>
            <Groups className={`${playersCountIcon}`} />
          </span>
        </div>
      </div>
      <div className={centerTopBar}>{children}</div>
      <Profile isWon={isWon}/>
    </div>
  );
}

export default MobileTopBar;
