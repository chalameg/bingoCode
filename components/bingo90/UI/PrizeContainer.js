import Image from "next/image";
import React from "react";
import style from "../../../styles/bingo90/jackpot.module.scss";

const PrizeContainer = ({prize}) => {
  let colorCode;
  if (prize <= 18) {
    colorCode = "#897A14";
  } else if (prize <= 36) {
    colorCode = "#5A1572";
  } else if (prize <= 54) {
    colorCode = "#101084";
  } else if (prize <= 72) {
    colorCode = "#268819";
  } else if (prize <= 90) {
    colorCode = "#841F1F";
  }

  return (
    <div className="flex">
      <Image
        src="/static/images/bingo90/Vector.svg"
        alt="vector"
        height={20}
        width={18}
      />
      <div style={{ color: colorCode }} className={`${style.prizeValue}`} >
        {prize}
      </div>
    </div>
  );
};

export default PrizeContainer;
