import React, { useContext } from "react";
import style from "../../../../styles/bingo90/index.module.scss";
import {
  hiLoPricesContainer,
  desktopFeatures,
} from "../../../../styles/bingo90/home.module.scss";
import Button from "../../../common/button/Button";
import { Bingo90Context } from "../../../../common/context";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
} from "react-icons/hi";
import highLowStyles from "../../../../styles/bingo90/highLow.module.scss";
import { useMediaQuery } from "@mui/material";

const HiLoPurchase = ({
  amount,
  addCredits,
  removeCredits,
  play,
  titleColor,
}) => {
  const { messageData } = useContext(Bingo90Context);
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

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
    <div className="flex flex-column align-center justify-center">
      <div className={`${highLowStyles.hiloTitle} `}>
        <div
          className="flex justify-center align-center"
          style={{ color: titleColor }}
        >
          <HiOutlineArrowNarrowUp style={{ height: "28px" }} />
          HI-LO
          <HiOutlineArrowNarrowDown style={{ height: "28px" }} />
        </div>
      </div>

      <div className={`flex flex-column align-center justify-center`}>
        <div className="flex">
          <Button
            buttonText={"+1"}
            className={style.coinCounterButton}
            onClick={() => {
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  audio.add.play();
                }
              }
              addCredits(1);
            }}
          />
          <Button
            buttonText={"+10"}
            className={style.coinCounterButton}
            onClick={() => {
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  audio.add.play();
                }
              }
              addCredits(10);
            }}
          />
        </div>

        <Button
          disabled={
            ["end", "scheduled", "new"].indexOf(messageData.type) !== -1 ||
            !messageData.type
          }
          onClick={play}
          icon={
            <div
              className="flex align-center justify-center"
              style={{ fontFamily: "Raleway" }}
            >
              <span>{amount.toLocaleString()}</span>
              <img
                style={{ width: 25 }}
                src={"/static/images/yellowCoin.png"}
                alt="coin icon"
              />{" "}
              <span>Play</span>
            </div>
          }
          className={`${style.bingo90Button}`}
        />

        <div className="flex">
          <Button
            buttonText={"-1"}
            className={style.coinCounterButton}
            onClick={() => {
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  audio.subtract.play();
                }
              }
              removeCredits(1);
            }}
          />
          <Button
            buttonText={"-10"}
            className={style.coinCounterButton}
            onClick={() => {
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  audio.subtract.play();
                }
              }
              removeCredits(10);
            }}
          />
        </div>
      </div>
      
    </div>
  );
};
export default HiLoPurchase;
