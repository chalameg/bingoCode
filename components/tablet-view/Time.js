import { useEffect, useState } from "react";
import moment from "moment";
import { mobileFeature, time } from "../../styles/index.module.scss";
import { AiFillClockCircle } from "react-icons/ai";

const Time = () => {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(moment().format("hh:mm A").toString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div className={`flex align-center ${mobileFeature} ${time}`}><AiFillClockCircle />&nbsp;{clock}</div>;
};
export default Time;
