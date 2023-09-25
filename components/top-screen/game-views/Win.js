import React, { Component, useContext, useEffect, useState } from "react";
import winStyles from "../../../styles/win.module.css";
import Zoom from "react-reveal/Zoom";
import BingoCardWin from "../board-container/bingoCardWin";
import PrizeValue from "../board-container/PrizeValue";
import { HomeContext } from "../../../common/context";
import jwt_decode from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";

const Win = ({ winner, winDelay, prizeValue, numbers_drawn }) => {
  const isMobile = useMediaQuery("(max-width:991px)");
  const isRotatedMobile = useMediaQuery(
    "(max-width:1024px) and (max-height:770px) and (min-height:765px) , (max-width:916px) and (orientation:landscape)"
  );

  const audio = {
    congrats:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/vocals/bingowin.mp3")
        : undefined,
  };

  useEffect(() => {
    console.warn("update");
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const token = localStorage.getItem("BINGO_ACCESS_TOKEN_KEY");
      var decoded = jwt_decode(token);

      console.log("User Id from Decoded token: ", decoded.user_id);

      const flag = localStorage.getItem("soundEnabled");

      /* if winner is logged in user*/
      if ((flag === "true") & (winner.user_id === decoded.user_id)) {
        audio.congrats.play();
      }
    }
  }, [winner]);

  if (winner === undefined) {
    return null;
  }
  let avatar = "/static/images/profile.png";
  const scheme = "https://";
  if (winner.avatar) {
    // avatar = scheme + 'api.bingo12.corpberry.com' + winner.avatar;
    avatar = scheme + process.env.NEXT_PUBLIC_SERVER_URI + winner.avatar;
  }
  const masks = [];
  masks.push(winner.ticket_mask);
  const numbers = winner.ticket_numbers;

  return (
    <Zoom>
      <div style={{ height: "100%" }} className={winStyles.winContainer}>
        <div
          className={`flex ${
            isMobile & !isRotatedMobile ? "flex-column" : "flex-row mt-m20"
          } h-100 align-center justify-center`}
        >
          <div
            className={`flex flex-column align-center justify-center ${
              !isMobile | isRotatedMobile ? "pr-20" : ""
            }`}
          >
            {winner.username && (
              <div className={winStyles.username}>{winner.username}</div>
            )}

            <img className={winStyles.playerIcon} src={avatar} alt="avatar" />
          </div>
          <div
            className={`flex flex-column ${
              !isMobile | isRotatedMobile
                ? "ml-20 pr-60"
                : "align-center justify-center"
            } `}
          >
            <div>
              {winner.ticket_numbers && (
                <BingoCardWin numbers={numbers} numbersDrawn={numbers_drawn} />
              )}
            </div>

            <div
              className={`${
                !isMobile | isRotatedMobile ? winStyles.prizeValueloc : ""
              }`}
            >
              <PrizeValue value={Math.floor(prizeValue)} />
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Win;
