import prizesStyles from "../../../styles/bingo90/prizes.module.css";
import React from "react";

const PrizeValue = ({value}) => {
  return <div className={prizesStyles.prizeValue}>
    <div className={prizesStyles.number}>
      {Number(value) > 0
        ? Number(value) < 100
          ? Number(value) -
          Math.floor(Number(value)) !==
          0
            ? Number(value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            : Number(value).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })
          : Number(value).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })
        : 0}
    </div>
    <img
      className={prizesStyles.coin}
      src={"/static/images/yellowCoin.png"}
      alt="coin icon"
    />
  </div>;
}
export default PrizeValue
