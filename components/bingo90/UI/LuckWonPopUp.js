import React from "react";
import style from "../../../styles/bingo90/index.module.scss";

const LuckWonPopUp = ({ line, amountWon, numberCreatedWon }) => {
  let colorCode;
  if (numberCreatedWon <= 18) {
    colorCode = "#897A14";
  } else if (numberCreatedWon <= 36) {
    colorCode = "#5A1572";
  } else if (numberCreatedWon <= 54) {
    colorCode = "#101084";
  } else if (numberCreatedWon <= 72) {
    colorCode = "#268819";
  } else if (numberCreatedWon <= 90) {
    colorCode = "#841F1F";
  }

  return (
    <div className={style.luckyWonPopup}>
      <div className="flex gap-1 items-center">
        <span
          className="poppins-bold"
          style={{ color: line === "2 Lines" ? "#FCE058" : line === '1 Line' ? "#4FE439" : line === 'Bingo' ? '#FF4B4B' : '#FE7F37' }}
        >
          {line}
        </span>
        <span
          className="luckiestGuy flex items-center justify-center"
          style={{
            background: "white",
            borderRadius: "50%",
            color: colorCode,
            height:"24px",
            width: "24px",
            fontSize:"18px"
          }}
        >
          {numberCreatedWon}
        </span>
      </div>
      <div>
        <span style={{ color: "#FE7F37" }}>You won </span>
        <span className="poppins-bold">${amountWon}</span>
      </div>
      <div style={{ color: "#FE7F37" }}>Congratulations!</div>
      <img
        src="/static/images/bingo90/faceSmillingHands.svg"
        style={{ height: "46px", width: "57px" }}
      />
      <div className="flex items-center raleway-bold">
        <span>Lucky Numbers</span>
        <img
          src="/static/images/bingo90/touchIcon.svg"
          style={{ height: "30px", width: "30px", marginLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default LuckWonPopUp;
