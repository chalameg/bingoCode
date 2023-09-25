import React, { useEffect, useState } from "react";
import ball from "../../../styles/bingo90/ball.module.scss";
import {Number} from "./Number";


function Ball({number, messageData, isMobile}) {
  const [animate, setAnimate] = useState(false)
  const [animateBall, setAnimateBall] = useState(false)
  let colorCode;
  if (number <= 18) {
    colorCode = "#897A14";
  } else if (number <= 36) {
    colorCode = "#5A1572";
  } else if (number <= 54) {
    colorCode = "#101084";
  } else if (number <= 72) {
    colorCode = "#268819";
  } else if (number <= 90) {
    colorCode = "#841F1F";
  }

  useEffect(() => {
    setTimeout(() =>{
      setAnimateBall(!animateBall)
    },200);
    
  }, [number]);

  useEffect(() => {
    setAnimate(true);
  }, [number]);

  const [latestNumbers, setLatestNumbers] = useState([]);
  useEffect(() => {
    if (number !== 0) {
      setLatestNumbers((previous) => {
        if (previous?.length === 0) {
          return [number];
        } else {
          const newArray = [number, ...previous];
          return newArray.slice(0, 3);
        }
      });
    }
  }, [number]);

  return (
    <div className={ball.container}>
      <div className={ball.latestNumbers}>
        <div className="flex flex-column" style={{gap:isMobile ? "2px" : '5px'}}>
        {latestNumbers.map((item, index) => (
          <Number number={item} key={index} haveBackground={true}/>
        ))}
        </div>
        <div className={`flex flex-column ${ball.numbersDrawn}`}>
          <p>{messageData?.numbersDrawn?.length}</p>
          <hr/>
          <p>90</p>
        </div>
      </div>

      <section className={ball.stage}>
        <figure className={ball.ball}>
          <span className={ball.shadow}></span>
          <span className={animate ? ball.iris : ball.iris1} style={{borderColor: colorCode}}>
            <Number number={number}/>
          </span>
        </figure>
      </section>
    </div>
  );
}

export default Ball;
