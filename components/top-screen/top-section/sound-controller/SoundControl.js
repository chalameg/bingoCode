import { useState } from "react";
import indexStyles, {
  soundControl,
} from "../../../../styles/index.module.scss";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const SoundControl = ({ winAudio, crowdAudio, playWin, isCrowd }) => {
  const [sound, setSound] = useState(true);

  const muteSound = (audio) => {
    setSound(audio);
    winAudio.pause();
    crowdAudio.pause();
    localStorage.setItem("soundEnabled", false);
  };

  const turnOnSound = (audio) => {
    setSound(audio);
    playWin ? winAudio.play() : crowdAudio.play();
    localStorage.setItem("soundEnabled", true);
  };

  return (
    <div>
      {!sound ? (
        <VolumeOffIcon
          onClick={() => turnOnSound(true)}
          className={soundControl}
          style={{ height: "40px", width: "40px", cursor: "pointer" }}
        />
      ) : (
        <VolumeUpIcon
          onClick={() => muteSound(false)}
          className={soundControl}
          style={{ height: "40px", width: "40px", cursor: "pointer" }}
        />
      )}
    </div>
  );
};
export default SoundControl;
