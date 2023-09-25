import React, { useContext, useEffect, useState } from "react";

import style from "../../styles/bingo90/jackpot.module.scss";
import Prize from "./UI/Prize";
import { Bingo90Context } from "../../common/context";
import PrizeContainer from "./UI/PrizeContainer";
import HiddenSpace from "./UI/HiddenSpace";

function Jackpot() {
  const {
    messageData,
    jackpotPrize,
    setJackpotPrize,
    bingoPrize,
    setBingoPrize,
    linePrize,
    setLinePrize,
    twoLinePrize,
    setTwoLinePrize,
    isWinningNow,
    playingNow,
    setPlayingNow
  } = useContext(Bingo90Context);

  
  const [alreadyWon, setAlreadyWon] = useState([]);
  const [prizesLen, setPrizesLen] = useState(0);

  useEffect(() => {
    const gamePrizes = messageData?.game?.game_prizes;
    // console.log("game prizes ", gamePrizes)
    // const gamePrizes = [{'1 Line': 11}, {'1 Line': 61}, {'2 Lines': 61}]

    let uniquePrizes = {};

    for (let i = 0; i < gamePrizes?.length; i++) {
      let gamePrizeKey = Object.keys(gamePrizes[i])[0];
      let gamePrizeValue = Object.values(gamePrizes[i]);

      if (!Object.keys(uniquePrizes).includes(gamePrizeKey)) {
        uniquePrizes[gamePrizeKey] = gamePrizeValue;
      }
    }

    const prizesLength = Object.keys(uniquePrizes).length;

    setPrizesLen(prizesLength);

    setTimeout(() => {
      if (prizesLength === 0) {
        setPlayingNow("Line");
        setAlreadyWon([]);
      } else if (prizesLength === 1) {
        setPlayingNow("2Lines");
        setAlreadyWon(["Line"]);
      } else if (prizesLength === 2) {
        if (messageData?.duration > 0) {
          setAlreadyWon(["Line", "2Lines", "Bingo", "Jackpot"]);
        } else {
          setPlayingNow("Bingo");
          setAlreadyWon(["Line", "2Lines"]);
        }
      } else {
        if (messageData?.duration > 0) {
          setAlreadyWon(["Line", "2Lines", "Bingo", "Jackpot"]);
        } else {
          setPlayingNow("Jackpot");
          setAlreadyWon(["Line", "2Lines", "Bingo"]);
        }
      }
    }, 2000);

    if (prizesLength > 0) {
      const gamePrizes = messageData?.game?.game_prizes;

      for (let i = 0; i < gamePrizes?.length; i++) {
        let gamePrizeKey = Object.keys(gamePrizes[i])[0];
        let gamePrizeValue = Object.values(gamePrizes[i]);

        if (gamePrizeKey === "Jackpot") {
          setJackpotPrize(gamePrizeValue);
        } else if (gamePrizeKey === "Bingo") {
          setBingoPrize(gamePrizeValue);
        } else if (gamePrizeKey === "2 Lines") {
          setTwoLinePrize(gamePrizeValue);
        } else {
          setLinePrize(gamePrizeValue);
        }
      }
    }
  }, [messageData]);

  return (
    <div className={`flex ${style.jackpot}`}>
      <div className={`flex justify-between items-center ${style.prizes}`}>
        <Prize
          name="LINE"
          amount={messageData?.game?.prizes[0]?.credit_value}
          color={
            (alreadyWon.includes("Line") && !isWinningNow) ||
            messageData?.duration > 0
              ? "rgba(79, 228, 57, 0.5)"
              : "#4FE439"
          }
          textShadow={
            playingNow === "Line"
              ? "1px 1px 13px #90FF7D"
              : isWinningNow && prizesLen === 1
              ? "0px 0px 21px #90FF7D, 1px 1px 13px #90FF7D"
              : ""
          }
        />

        <Prize
          name="2 LINES"
          amount={messageData?.game?.prizes[1]?.credit_value}
          color={
            (alreadyWon.includes("2Lines") && !isWinningNow) ||
            messageData?.duration > 0
              ? "rgba(252, 224, 88, 0.5)"
              : "#FCE058"
          }
          textShadow={
            playingNow === "2Lines" && !isWinningNow
              ? "1px 1px 13px #FCE058"
              : isWinningNow && prizesLen === 2
              ? "0px 0px 21px #FCE058, 1px 1px 13px #FCE058"
              : ""
          }
        />

        <Prize
          name="BINGO"
          amount={messageData?.game?.prizes[2]?.credit_value}
          color={
            (alreadyWon.includes("Bingo") && !isWinningNow) ||
            messageData?.duration > 0
              ? "rgba(255, 75, 75, 0.5)"
              : "#FF4B4B"
          }
          textShadow={
            messageData?.duration > 0
              ? ""
              : playingNow === "Bingo" && !isWinningNow
              ? "1px 1px 13px #FF6A6A"
              : isWinningNow && prizesLen === 3
              ? "0px 0px 21px #FF6A6A, 1px 1px 13px #FF6A6A"
              : ""
          }
        />

        <Prize
          name="JP"
          className={
            (alreadyWon.includes("Jackpot") && !isWinningNow) ||
            messageData?.numbersDrawn?.length > 44 ||
            messageData?.duration > 0
              ? style.alreadyWonJackpotText
              : style.jackpotText
          }
          amount={messageData?.jackpot_credit_value}
          textShadow={
            messageData?.duration > 0
              ? ""
              : playingNow === "Jackpot" && !isWinningNow
              ? "1px 1px 13px #FF6E49"
              : isWinningNow && prizesLen === 4
              ? "0px 4px 21px #FF6E49, 1px 1px 13px #FF6E49"
              : ""
          }
        />
      </div>

      <div className="flex justify-between items-center" style={{width:"100%"}}>
        <div className="flex items-center justify-center" style={{width:"20%"}}>
          {linePrize ? <PrizeContainer prize={linePrize} /> : <HiddenSpace />}
        </div>
        <div className="flex items-center justify-center" style={{width:"35%"}}>
        {twoLinePrize ? <PrizeContainer prize={twoLinePrize} /> : <HiddenSpace />}
        </div>
        <div className="flex items-center justify-center" style={{width:"25%"}}>
        {bingoPrize ? <PrizeContainer prize={bingoPrize} /> : <HiddenSpace />}
        </div>
        <div className="flex items-center justify-center" style={{width:"25%"}}>
        {jackpotPrize ? <PrizeContainer prize={jackpotPrize} /> : <HiddenSpace />}
        </div>
      </div>
    </div>
  );
}

export default Jackpot;
