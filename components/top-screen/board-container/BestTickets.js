import React, { useState, useEffect } from "react";
import bestTicketsStyles from "../../../styles/bestTickets.module.css";
import { Number } from "./number";
import { Animated } from "react-animated-css";
import ReactTooltip from "react-tooltip";

let timerVar,
  closestWinningTickets,
  avatarSrc,
  remaining = [];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}

const BestTickets = ({ tickets }) => {
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
  closestWinningTickets = [...tickets]
  // [].concat(tickets).sort((a, b) => {
  //   return (
  //     (a?.numbers_remaining?.length || 0) - (b?.numbers_remaining?.length || 0)
  //   );
  // });
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

  closestWinningTickets = closestWinningTickets.map(
    (ticket, i) => {
      avatarSrc = ticket.avatar.includes("avatar")
        ? "https://" + process.env.NEXT_PUBLIC_SERVER_URI + ticket.avatar
        : null;
      // if (ticket.numbers_remaining?.length) {
      if (ticket.numbers_remaining?.length > 2) {
        remaining = ticket.numbers_remaining.slice(0, 2).map((number, i) => {
          return (
            <Animated animationIn="flipInY" key={i} animationInDelay={i * 300}>
              {/* <img
                  alt="ball icon"
                  src={"/images/smallballs/" + number + ".png"}
                /> */}
              <Number number={number} />
            </Animated>
          );
        });
        var extra;
        extra = <span>..</span>;
      } else if (ticket.numbers_remaining?.length) {
        remaining = ticket.numbers_remaining.map((number, i) => {
          return (
            <Animated animationIn="flipInY" key={i} animationInDelay={i * 300}>
              <Number number={number} />
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
          { ticket?.numbers_remaining.length < 1 && ticket?.win ? (
            <div style={{ marginLeft: "4px" }}>WIN</div>
          ) : (
            <>
              {remaining}
              {extra}
            </>
          )}
        </div>
      );
    }
    // }
  );

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
