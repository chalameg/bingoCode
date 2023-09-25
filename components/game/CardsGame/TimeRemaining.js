import React, { useContext } from "react";
import { HomeContext } from "../../../common/context";
import buyTicketsStyles from "../../../styles/buyTickets.module.css";
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
} from "../../../styles/main.module.css";
import {
  mobileLandscapeView,
} from "../../../styles/home.module.scss";

const TimeRemaining = () => {
  const { messageData } = useContext(HomeContext);
  const time = Math.floor(
    (75 - (messageData?.game?.numbers_drawn?.length || 0)) / 18
  );
  return (
    <div className="mb">
      <div className="flex align-center justify-center">
        <div className={buyTicketsStyles.wrapper}>
          {/*<div className={buyTicketsStyles.clock}>*/}
          {/*  <div className={buyTicketsStyles.clockCircles}>*/}
          {/*    <div className={buyTicketsStyles.clockCirclesItem}></div>*/}
          {/*    <div className={buyTicketsStyles.clockCirclesItem}></div>*/}
          {/*    <div className={buyTicketsStyles.clockCirclesItem}></div>*/}
          {/*    <div className={buyTicketsStyles.clockCirclesItem}>*/}
          {/*      <div className={buyTicketsStyles.wave}></div>*/}
          {/*      <div className={buyTicketsStyles.wave}></div>*/}
          {/*      <div className={buyTicketsStyles.wave}></div>*/}
          {/*      <div className={buyTicketsStyles.wave}></div>*/}
          {/*      <div className={buyTicketsStyles.wave}></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className={buyTicketsStyles.clockTimes}>*/}
          {/*    <div className={buyTicketsStyles.clockTimesSecond}></div>*/}
          {/*    <div className={buyTicketsStyles.clockTimesMinute}></div>*/}
          {/*    <div className={buyTicketsStyles.clockTimesHour}></div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={clock}>
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
            <strong className={`${mobileLandscapeView}`} style={{fontSize:"18px"}}>{time} minute{time > 1 ? "s" : ""}</strong> 
            
          </span>
        </div>
      </div>
    </div>
  );
};
export default TimeRemaining;
