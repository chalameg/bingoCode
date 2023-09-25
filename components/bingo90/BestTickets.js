import React, { useState, useEffect } from "react";
import bestTicketsStyles from "../../styles/bingo90/bestTickets.module.css";
import { Number } from "./current-container/Number";
import { Animated } from "react-animated-css";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let timerVar,
  closestWinningTickets,
  avatarSrc,
  remaining = [];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}

const BestTickets = ({ tickets, messageData }) => {
  const [timer, setTimer] = useState(0);
  const [topCount, setTopCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const val = getWindowDimensions();
      if (val > 800 && val < 1100) {
        setTopCount(3);
      } else {
        setTopCount(5);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
    timer !== "repeat"
      ? (timerVar = setTimeout(
          () => setTimer(timer < 2 ? timer + 1 : "repeat"),
          2000
        ))
      : setTimer(0);
    return () => clearTimeout(timerVar);
  }, [timer]);

  const currentNumber = messageData?.game?.numbers_drawn
    ? messageData.game.numbers_drawn[messageData.game.numbers_drawn?.length - 1]
    : 0;

  closestWinningTickets = [...tickets]

  let trans = [];
  let leftovers = [];

  closestWinningTickets.forEach((t) => {
    if (
      (t?.numbers_remaining.length >= 1 && t.win !== true) ||
      (t?.numbers_remaining.length < 1 && t.win === true)
    ) {
      if (t.win) {
        trans.push(t);
      } else {
        leftovers.push(t);
      }
    }
  });

  const trans_clone = [...trans];
  trans_clone.forEach((ticket, index) => {
    if (
      ticket?.numbers_remaining.length < 1 &&
      ticket.win
    ) {
      trans.unshift(trans.splice(index, 1)[0]);
    }
  });

  closestWinningTickets = [...trans, ...leftovers];
  closestWinningTickets = closestWinningTickets.slice(0, 5);

  closestWinningTickets = closestWinningTickets.map((ticket, i) => {
    avatarSrc = ticket.avatar.includes("avatar")
      ? "https://" + process.env.NEXT_PUBLIC_SERVER_URI + ticket.avatar
      : null;
    if (ticket.numbers_remaining?.length > 2) {
      remaining = ticket.numbers_remaining.slice(0, 2).map((number, i) => {
        return (
          <Animated
            animationIn="flipInY"
            key={i}
            animationInDelay={i * 300}
            style={{ marginRight: "6px" }}
          >
            <Number number={number} haveBackground={true}/>
          </Animated>
        );
      });
      var extra;
      extra = <span style={{color: "#FE7F37", fontSize:"35px"}}>..</span>;
    } else if (ticket.numbers_remaining?.length) {
      remaining = ticket.numbers_remaining.map((number, i) => {
        return (
          <Animated
            animationIn="flipInY"
            key={i}
            animationInDelay={i * 300}
            style={{ marginRight: "4px" }}
          >
            {/* check if number is different from drown number here */}
            {number != currentNumber && <Number number={number} haveBackground={true}/>}
          </Animated>
        );
      });
      extra = "";
    } else {
      remaining = [];
    }
    return (
      <div className={[bestTicketsStyles.ticketNumbers].join(" ")} key={i}>
        <div className={`${bestTicketsStyles.ticketAvi}`}>
          {avatarSrc ? (
            <img
              data-tip={ticket.username}
              src={avatarSrc}
              data-place={"left"}
              alt={`${ticket.username} avatar`}
            />
          ) : (
            <img
              alt={`${ticket.username} avatar`}
              data-tip={ticket.username}
              data-place={"left"}
              src={"/static/images/profile.png"}
            />
          )}
        </div>
          
         {ticket?.numbers_remaining.length < 1 && ticket?.win ? (
          <div className={`flex ${bestTicketsStyles.winningContainer}`}>
            <img src="/static/images/bingo90/confetti.png" alt="confetti" />
            <span>WIN</span>
          </div>
        ) : (
          <>
            {remaining}
            {extra}
          </>
        )}
      </div>
    );
  });

  return (
    <div className={`${bestTicketsStyles.container}`}>
      <ReactTooltip />

      <div className={bestTicketsStyles.closestTickets}>
        {closestWinningTickets}
      </div>
    </div>
  );
};

export default BestTickets;
