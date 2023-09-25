import React, { useContext, useEffect, useState } from "react";
import { title } from "../../../styles/index.module.scss";
import {
  hiLoPlayButton,
  homeTitle,
  priceButton,
  purchaseAmount,
  hiLoPricesContainer,
  hiLoQuestionMarkButton,
  desktopFeatures,
} from "../../../styles/home.module.scss";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Button from "../../common/button/Button";
import DollarIcon from "@mui/icons-material/AttachMoney";
import { HomeContext } from "../../../common/context";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const HiLoPurchaseOld = ({
  setPlayHiLo,
  openDialog,
  amount,
  addCredits,
  removeCredits,
  play,
}) => {
  const { messageData } = useContext(HomeContext);

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
      <div
        className={` ${desktopFeatures} flex justify-center align-center luckiestText text-orange`}
        style={{ fontSize: "24px", marginBottom: "10px" }}
      >
        <BsArrowUp style={{ height: "13px" }} />
        hi-lo
        <BsArrowDown style={{ height: "13px" }} />
      </div>
      <div
        className={`flex align-center justify-center ${hiLoPricesContainer}`}
      >
        <Button
          buttonText={"-10"}
          className={priceButton}
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
        <Button
          buttonText={"-1"}
          className={priceButton}
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
        <div className={`flex align-center ${purchaseAmount}`}>
          <Button
            disabled={
              ["end", "scheduled", "new"].indexOf(messageData.type) !== -1 ||
              !messageData.type
            }
            onClick={play}
            icon={
              <div className="flex align-center justify-center">
                <span>{amount.toLocaleString()}</span>
                <img
                  style={{ width: 25 }}
                  src={"/static/images/blackCoin.png"}
                  alt="coin icon"
                />{" "}
                <span className="luckiestText">play</span>
              </div>
            }
            className={`${hiLoPlayButton} orangeButton pressed`}
          />
        </div>
        <Button
          buttonText={"+1"}
          className={priceButton}
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
          className={priceButton}
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
      <div className={`flex justify-center`}>
        {/* <Button
          disabled={
            ["end", "scheduled", "new"].indexOf(messageData.type) !== -1 ||
            !messageData.type
          }
          onClick={play}
          buttonText="Play"
          className={`${hiLoPlayButton} btn-orange pressed`}
        /> */}
        {/* <IconButton
          color="primary"
          className={`normal ${hiLoQuestionMarkButton}`}
          onClick={openDialog}
        >
          <QuestionMarkIcon onClick={openDialog} />
        </IconButton> */}
      </div>
    </div>
  );
};
export default HiLoPurchaseOld;
