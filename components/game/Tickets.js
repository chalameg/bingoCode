import React, { useContext, useEffect, useRef } from "react";
import ticketsStyles from "../../styles/tickets.module.css";
import NumbersRemaining from "./NumbersRemaining.js";
import BingoCard from "./BingoCard.js";
// import glowingStyles from './glowing.module.css';
import { Animated } from "react-animated-css";
import { Fade } from "react-reveal";
import { FaArrowUp } from "react-icons/fa";
import { HomeContext } from "../../common/context";

const Tickets = () => {
  const { messageData } = useContext(HomeContext);

  const audio = {
    add:
      typeof Audio !== "undefined"
        ? new Audio(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/heartbeat.mp3"
          )
        : undefined,
  };
  useEffect(() => {
    const is = messageData.tickets?.find(
      (item) => item.numbers_remaining && item.numbers_remaining?.length < 2
    );
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (is && flag === "true") {
        audio.add.volume = 0.6;
        audio.add.play();
      }
    } else {
      audio.add.pause();
    }
  }, [messageData.tickets]);
  const refScrollUp = useRef();

  let sorted_tickets = [];
  messageData.tickets.map((tickets) => {
    if (sorted_tickets.some((ticket) => ticket.id === tickets.id) === false) {
      sorted_tickets.push(tickets);
    }
  });
  if (messageData.winners?.length) {
    messageData.winners.forEach(({ ticket_id }) => {
      sorted_tickets.map((ticket) => {
        if (ticket.id === ticket_id) {
          ticket.win = true;
        }
        return ticket;
      });
    });
  }

  const tickets = sorted_tickets.map((ticket, index) => {
    const numbers = (
      <BingoCard
        angle={messageData.angle}
        number={messageData.number}
        winState={messageData.winState}
        selfWin={messageData.selfWin}
        numbers={ticket.numbers}
        numbersDrawn={messageData.numbersDrawn}
        freeText={""}
        key={index}
        inCardsGame={true}
        inGame={messageData.end}
        winners={messageData.winners}
      />
    );

    var ticketsClasses = [ticketsStyles.ticket];
    if (index === 0) {
      ticketsClasses.push(ticketsStyles.first);
    } else {
      ticketsClasses.push(ticketsStyles.second);
    }
    return (
      <Animated
        key={index}
        animationIn="bounceInLeft"
        animationOut="BounceOutRight"
      >
        <NumbersRemaining
          cardNumber={index}
          position={ticket.position}
          numbers_remaining={
            ticket.numbers_remainings.sort((a, b) => a.length > b.length)[0]
          }
          numbersDrawn={messageData.numbersDrawn}
          winners={messageData.winners}
          ticket_id={ticket.id}
          win={ticket.win}
        />
        <div className={ticketsClasses.join(" ")}>
          <div className={ticketsStyles.numbers}>{numbers}</div>
        </div>
      </Animated>
    );
  });
  return (
    <div className={ticketsStyles.container} ref={refScrollUp}>
      <div className={ticketsStyles.title}>
        <span className={ticketsStyles.titleNum}>{sorted_tickets?.length}</span>
        <span>&nbsp; Card{sorted_tickets?.length !== 1 && "s"}</span>
      </div>

      <div className={ticketsStyles.tickets}>
        {tickets}
        {/* <div className={ticketsStyles.ticketsCol}>
          {extra_tickets}
        </div> */}
      </div>
      <Fade when={refScrollUp.current?.scrollTop > 200}>
        <button
          className={ticketsStyles.scrollUpBtn}
          onClick={() => {
            refScrollUp.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <FaArrowUp />
        </button>
      </Fade>
    </div>
  );
};

export default Tickets;
