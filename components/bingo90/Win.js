import React, { useEffect } from "react";
import winStyles from "../../styles/bingo90/win.module.css";
import Zoom from "react-reveal/Zoom";
import BingoCardWin from "./bingoCardWin";
import PrizeValue from "./UI/PrizeValue";
import jwt_decode from "jwt-decode";

const Win = ({ winner, winDelay, prizeValue, numbers_drawn }) => {
  const audio = {
    congrats:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/vocals/bingowin.mp3")
        : undefined,
  };

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const token = localStorage.getItem("BINGO_ACCESS_TOKEN_KEY");
      var decoded = jwt_decode(token);

      const flag = localStorage.getItem("soundEnabled");

      /* if winner is logged in user*/
      if ((flag === "true") & (winner.user_id === decoded.user_id)) {
        audio.congrats.play();
      }
    }
  }, [winner]);

  if (winner === undefined) {
    return null;
  }
  let avatar = "/static/images/profile.png";
  const scheme = "https://";

  if (winner.avatar) {
    avatar = scheme + process.env.NEXT_PUBLIC_SERVER_URI + winner.avatar;
  }

  const masks = [];
  masks.push(winner.ticket_mask);
  const numbers = winner.ticket_numbers;

  return (
    <Zoom>
      <div className={winStyles.winContainer}>
        <div className={`flex flex-column h-100 align-center justify-center`}>
          {winner.username && (
            <div className={winStyles.username}>{winner.username}</div>
          )}

          <img className={winStyles.playerIcon} src={avatar} alt="avatar" />

          <PrizeValue value={Math.floor(prizeValue)} />

          {winner.ticket_numbers && (
            <BingoCardWin numbers={numbers} numbersDrawn={numbers_drawn} />
          )}
        </div>
      </div>
    </Zoom>
  );
};

export default Win;
