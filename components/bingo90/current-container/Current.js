import React, { useEffect, useState } from "react";
import currentStyles from "../../../styles/bingo90/current.module.scss";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import usePrevious from "../../../hooks/usePrevious";

const Current = ({ number, numbersCount, numbersDrawn }) => {
  const [timer, setTimer] = useState(0);
  const [current, setCurrent] = useState({
    color: "",
    letter: "",
  });
  const previousNumber = usePrevious(number);
  const handleColor = () => {
    if (number < 16) {
      setCurrent({
        color: "#000000",
        letter: "B",
      });
    } else if (number < 31) {
      setCurrent({
        color: "#F2BD00",
        letter: "I",
      });
    } else if (number < 46) {
      setCurrent({
        color: "#6E1CFF",
        letter: "N",
      });
    } else if (number < 61) {
      setCurrent({
        color: "#479B04",
        letter: "G",
      });
    } else if (number < 76) {
      setCurrent({
        color: "#FA4545",
        letter: "O",
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < 101) {
        setTimer((prev) => prev + 1);
      }
    }, 5);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    handleColor();
    if (previousNumber !== number) {
      setTimer(0);
    }
  }, [number]);
  return (
    <div
      style={{ paddingBottom: "5px" }}
      className={"flex justify-center align-center"}
    >
      <div className={[currentStyles.container, current.color].join(" ")}>
        <div className={currentStyles.letter} style={{ color: current.color }}>
          {current.letter}
        </div>
        <CircularProgressbarWithChildren
          text={number}
          value={timer}
          styles={buildStyles({
            root: {
              fontFamily: "Arial",

              width: 50,
            },
            rotation: 0.6,
            background: {
              fill: "#fff",
            },
            pathColor: current.color,
            textColor: current.color,
            trailColor: current.color + "20",
            textSize: "40px",
            pathTransition: "none",
            strokeLinecap: "round",
            fontFamily: "Arial",
          })}
        >
      
        </CircularProgressbarWithChildren>
          
      </div>
    </div>
  );
};

export default Current;
