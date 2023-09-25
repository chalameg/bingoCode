import React, { useContext } from "react";
import { Bingo90Context } from "../../../../common/context";
import buyTicketsStyles from "../../../../styles/bingo90/buyTickets.module.css";
import {
  bottom,
  center,
  clock,
  hour,
  left,
  minute,
  right,
  second,
  shadow,
  top,
  defaultStyle,
  orangeStyle,
  timeText,
  clockOrange
} from "../../../../styles/bingo90/main.module.css";

const TimeRemaining = ({ isContainerStyleGray }) => {
  const { messageData } = useContext(Bingo90Context);

  const time = Math.floor(
    (90 - (messageData?.game?.numbers_drawn?.length || 0)) / 22
  );

  return (
    <div className="mb">
      <div
        className="flex align-center justify-center"
      >
        <div className={buyTicketsStyles.wrapper}>
          <div className={isContainerStyleGray ? clock : clockOrange}>
            <div className={top}></div>
            <div className={right}></div>
            <div className={bottom}></div>
            <div className={left}></div>
            <div className={center}></div>
            <div className={shadow}></div>
            <div className={hour}></div>
            <div className={minute}></div>
            <div className={second}></div>
          </div>
          <span>
            <strong className={`${isContainerStyleGray ? defaultStyle : orangeStyle} ${timeText}`}>
              {time} minute{time > 1 ? "s" : ""}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
export default TimeRemaining;
