import { centerContainer, currentNumbers } from "../../../styles/players.module.css";
import CurrentNumber from "./CurrentNumber";
import React, { useEffect, useState } from "react";
import PrizeValue from "./PrizeValue";
import { Number } from "./number";

const CenterNumber = ({
  current,
  prizeValue,
  doTurnStep,
  jackpotWinCount,
  jackpotCreditValue,
  numbersCount,
  numbersDrawn
}) => {
  const [latestNumbers, setLatestNumbers] = useState([]);
  useEffect(() => {
    if (current !== 0) {
      setLatestNumbers((previous) => {
        if (previous?.length === 0) {
          return [current];
        } else {
          const newArray = [current, ...previous];
          return newArray.slice(0, 3);
        }
      });
    }
  }, [current]);
  return (
    <div className={`${centerContainer} flex justify-center align-center h-100`}>
      <CurrentNumber
        doTurnStep={doTurnStep}
        jackpotWinCount={jackpotWinCount}
        jackpotCreditValue={jackpotCreditValue}
        numbersCount={numbersCount}
        currentNumber={current}
        numbersDrawn={numbersDrawn}
      />
      <div className={`flex align-center justify-center ${currentNumbers}`} style={{marginTop: '3px'}}>
        {latestNumbers.slice(1).map((item, index) => (
          <Number number={item} key={index} />
        ))}
      </div>
    </div>
  );
};
export default CenterNumber;
