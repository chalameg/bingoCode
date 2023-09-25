import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";
import { soundControllIcon, soundControllContainer } from "../../../styles/bingo90/index.module.scss";
import { useMediaQuery } from "@mui/material";

const SoundControl = ({
  bingo90winAudio,
  bingo90crowdAudio,
  bingo90InBetween,
  inBetween,
  playWin,
}) => {
  const [sound, setSound] = useState(true);
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));
  const muteSound = (audio) => {
    setSound(audio);
    bingo90winAudio.pause();
    bingo90crowdAudio.pause();
    bingo90InBetween.pause();
    localStorage.setItem("soundEnabled", false);
  };

  const turnOnSound = (audio) => {
    setSound(audio);
    if (inBetween) {
      bingo90InBetween.play();
    } else if (playWin) {
      bingo90winAudio.play();
    } else bingo90crowdAudio.play();
    localStorage.setItem("soundEnabled", true);
  };

  return (
    <div className={soundControllContainer} style={{zIndex:"1400"}}>
      {!sound ? (
        <VolumeOffIcon
          onClick={() => turnOnSound(true)}
          className={`${soundControllIcon}`}
        />
      ) : (
        <VolumeUpIcon
          onClick={() => muteSound(false)}
          className={`${soundControllIcon}`}
        />
      )}
    </div>
  );
};
export default SoundControl;
