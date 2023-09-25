import { HiLoContext } from "../../../common/context";
import { useContext } from "react";

import { title } from "../../../styles/index.module.scss";
import {
  hiLoPlayButton,
  hiLoPricesContainer,
  homeTitle,
  priceButton,
  purchaseAmount,
} from "../../../styles/home.module.scss";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Button from "../../common/button/Button";
import DollarIcon from "@mui/icons-material/AttachMoney";

const HiLoPurchase = ({ setIsOpen }) => {
  const { amount, updateAmount, play } = useContext(HiLoContext);
  const flag = localStorage.getItem("soundEnabled");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    setIsSoundEnabled(flag);
  }, [flag]);

  const audio = {
    add:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/add.mp3")
        : undefined,
    subtract:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/subtract.mp3")
        : undefined,
    play:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/playBuyButton.mp3")
        : undefined,
  };

  return (
    <div>
      <div className="flex align-center justify-center">
        <h2 className={`${homeTitle} ${title} m0`}>High-Low Game</h2>&nbsp;
        <IconButton
          color="primary"
          className="normal"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <QuestionMarkIcon />
        </IconButton>
      </div>
      <div
        className={`flex align-center justify-center ${hiLoPricesContainer}`}
      >
        <Button
          buttonText={"-10"}
          className={priceButton}
          icon={<DollarIcon fontSize="small" />}
          onClick={() => {
            if (isSoundEnabled === "true") {
              audio.subtract.play();
            }
            updateAmount(-10);
          }}
        />
        <Button
          buttonText={"-1"}
          className={priceButton}
          icon={<DollarIcon fontSize="small" />}
          onClick={() => {
            if (isSoundEnabled === "true") {
              audio.subtract.play();
            }
            updateAmount(-1);
          }}
        />
        <div className={`flex align-center ${purchaseAmount}`}>
          <span>{amount}</span>
          <DollarIcon fontSize="large" />
        </div>
        <Button
          buttonText={"+1"}
          className={priceButton}
          icon={<DollarIcon fontSize="small" />}
          onClick={() => {
            if (isSoundEnabled === "true") {
              audio.add.play();
            }
            updateAmount(1);
          }}
        />
        <Button
          buttonText={"+10"}
          className={priceButton}
          icon={<DollarIcon fontSize="small" />}
          onClick={() => {
            if (isSoundEnabled === "true") {
              audio.add.play();
            }
            updateAmount(10);
          }}
        />
      </div>
      <div className={`flex justify-center`}>
        <Button onClick={play} buttonText="Play" className={hiLoPlayButton} />
      </div>
    </div>
  );
};
export default HiLoPurchase;
