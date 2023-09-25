import React from "react";
import style from "../../../styles/bingo90/jackpot.module.scss";
import PrizeContainer from "./PrizeContainer";
import HiddenSpace from "./HiddenSpace";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

function Prize({
  name,
  amount,
  color,
  textShadow,
  className,
}) {
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

  return (
    <div className={`flex flex-column justify-center align-center`}>
      <span
        style={{
          color: color,
          textShadow: textShadow,
          fontVariant: "small-caps",
        }}
        className={`${style.prizeName} ${className}`}
      >
        {name}
      </span>
      <div className={"flex align-center"}>
        <span
          className={`${style.amount} ${className}`}
          style={{ color: color, textShadow: textShadow }}
        >
          {amount < 100 ? amount : Math.floor(amount)}
        </span>
        <div className={style.prizeImg}>
          <Image
            src={"/static/images/yellowCoin.png"}
            alt="coin icon"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}

export default Prize;
