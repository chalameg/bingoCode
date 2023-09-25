import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {countdown} from '../../../styles/index.module.scss';
import GameCountdowncss from "../../../styles/gameCountDown.module.css"

import { useContext, useEffect , useState} from "react";
import { HomeContext } from "../../../common/context";


const GameCountdown = ({ duration = 0 }) => {

  const { setMessageData } = useContext(HomeContext);

  
  const countdown_return = (remainingTime) => {
    
    useEffect(() => { 
      console.log("Remaining time is less than",remainingTime)
      if (remainingTime < 2 ){
        setMessageData((previous) => ({
          ...previous,
          stopBuyCard: true,
        }));
      }
    }, [remainingTime])
    
    return (
      <div>
        <div className={`${GameCountdowncss.wrapper}`}>
          <div className={`${GameCountdowncss.timerContainer}`}>
              <svg
                width="188"
                height="213"
                viewBox="0 0 188 213"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1343_311)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M82.1046 7H103.354C105.213 7 106.721 8.50837 106.721 10.369V19.3942C106.721 21.2548 105.213 22.7632 103.354 22.7632H101.177V32.4648C109.504 33.2906 117.71 35.3362 125.525 38.5749C135.289 42.6211 144.168 48.4161 151.753 55.6235L156.372 51.0022L155.148 49.7776C154.097 48.726 154.097 47.021 155.148 45.9694L160.249 40.8658C161.3 39.8142 163.004 39.8142 164.055 40.8658L176.074 52.8902C177.125 53.9418 177.125 55.6468 176.074 56.6984L170.973 61.802C169.922 62.8536 168.218 62.8536 167.167 61.802L165.931 60.5661L160.802 65.6974C161.912 67.1481 162.977 68.637 163.996 70.1623C173.415 84.266 178.442 100.847 178.442 117.81C178.416 140.548 169.376 162.347 153.306 178.425C137.236 194.503 115.448 203.547 92.7211 203.573C75.7671 203.573 59.1938 198.543 45.097 189.119C31.0003 179.695 20.0132 166.301 13.5252 150.63C7.03714 134.959 5.33958 117.715 8.64714 101.078C11.1996 88.2399 16.6442 76.2084 24.5066 65.8719L19.2041 60.5667L17.9765 61.7949C16.9255 62.8465 15.2213 62.8465 14.1702 61.7949L9.06912 56.6912C8.01804 55.6396 8.01804 53.9347 9.06912 52.8831L21.0876 40.8587C22.1387 39.8071 23.8428 39.8071 24.8939 40.8587L29.9951 45.9623C31.0461 47.0139 31.0461 48.7189 29.9951 49.7705L28.7633 51.0028L33.5316 55.7736C45.2947 44.5391 60.0212 36.874 75.9978 33.6945C78.7446 33.1478 81.508 32.7378 84.2782 32.4635V22.7632H82.1046C80.2448 22.7632 78.7372 21.2548 78.7372 19.3942V10.369C78.7372 8.50837 80.2448 7 82.1046 7ZM92.7211 45.9654C78.5157 45.9654 64.6293 50.18 52.818 58.0763C41.0068 65.9725 31.8013 77.1957 26.3657 90.3265C20.93 103.457 19.5084 117.906 22.2807 131.845C25.0529 145.784 31.8945 158.588 41.9401 168.637C51.9857 178.686 64.7842 185.528 78.717 188.299C92.6498 191.071 107.091 189.646 120.214 184.205C133.338 178.765 144.554 169.553 152.444 157.735C160.335 145.916 164.545 132.022 164.542 117.81C164.523 98.7593 156.949 80.4949 143.484 67.0254C130.019 53.5558 111.762 45.9817 92.7211 45.9654Z"
                    fill="#11298A"
                  />
                </g>
                <rect
                  x="90.4453"
                  y="52.7146"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  fill="#11298A"
                />
                <rect
                  x="157.875"
                  y="115.572"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(90 157.875 115.572)"
                  fill="#11298A"
                />
                <rect
                  x="150.449"
                  y="148.552"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(122.175 150.449 148.552)"
                  fill="#11298A"
                />
                <rect
                  x="148.254"
                  y="82.4291"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(60.6038 148.254 82.4291)"
                  fill="#11298A"
                />
                <rect
                  x="45.3965"
                  y="140.715"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(60.6038 45.3965 140.715)"
                  fill="#11298A"
                />
                <rect
                  x="40.1602"
                  y="114.429"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(90 40.1602 114.429)"
                  fill="#11298A"
                />
                <rect
                  x="89.3027"
                  y="170.43"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  fill="#11298A"
                />
                <rect
                  x="123.73"
                  y="59.5718"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(33.832 123.73 59.5718)"
                  fill="#11298A"
                />
                <rect
                  x="127.396"
                  y="171.93"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(150.425 127.396 171.93)"
                  fill="#11298A"
                />
                <rect
                  x="48.7617"
                  y="88.5764"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(119.275 48.7617 88.5764)"
                  fill="#11298A"
                />
                <rect
                  x="69.7129"
                  y="69.1522"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(148.538 69.7129 69.1522)"
                  fill="#11298A"
                />
                <rect
                  x="63.6152"
                  y="161.02"
                  width="6.85719"
                  height="12.5715"
                  rx="3.4286"
                  transform="rotate(33.301 63.6152 161.02)"
                  fill="#11298A"
                />
                <defs>
                  <filter
                    id="filter0_d_1343_311"
                    x="0"
                    y="0"
                    width="187.441"
                    height="212.573"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0666667 0 0 0 0 0.160784 0 0 0 0 0.541176 0 0 0 0.67 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1343_311"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1343_311"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
          </div>
          <div className={`${GameCountdowncss.countdownContainer}`}>
              <div className={`${GameCountdowncss.backgroundContainer}`}></div>
          </div>
          <span className={`${GameCountdowncss.timerText}`} style={{ fontSize: 80}}>{remainingTime} </span> 
      </div>
      </div>
      )
  }
  return (
    <div className={`${countdown} h-100 flex flex-1 justify-center align-center`}>
      <CountdownCircleTimer size={0.1} isPlaying duration={duration} colors={"#273fa3"}>
        
        {({ remainingTime }) => (
          countdown_return(remainingTime)
        )}
      </CountdownCircleTimer>
    </div>
  );
};
export default GameCountdown;
