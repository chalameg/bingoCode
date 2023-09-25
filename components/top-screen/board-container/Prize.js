import React from "react";
import prizesStyles from "../../../styles/prizes.module.css";
import PrizeValue from "./PrizeValue";
import BingoCardMini from "./bingoCardMini";

const Prize = ({ name, nextPrizes, jackpotCreditValue }) => {
  const prizeValue = nextPrizes?.length ? nextPrizes[0].credit_value : 0;
  return (
    <div className={prizesStyles.prize}>
      <div className={prizesStyles.columns}>
        <div className={`${prizesStyles.name} luckiestText`} >{name == "Interior" ? 'in' : name == "Exterior" ? "out" : name }</div>
        <div className={prizesStyles.bingoCardContainer}>
          {nextPrizes && nextPrizes[0].masks && (
            <BingoCardMini masks={nextPrizes[0].masks} />
          )}
        </div>
        <PrizeValue value={prizeValue} />
      </div>
    </div>
  );
};

export default Prize;
