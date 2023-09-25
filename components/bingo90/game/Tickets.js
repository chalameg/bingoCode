import React, { useContext, useEffect, useRef, useState } from "react";
import ticketsStyles from "../../../styles/bingo90/tickets.module.css";
import indexStyle from "../../../styles/bingo90/index.module.scss";
import NumbersRemaining from "./NumbersRemaining.js";
import BingoCard from "./BingoCard.js";
import { Animated } from "react-animated-css";
import { Fade } from "react-reveal";
import { FaArrowUp } from "react-icons/fa";
import { Bingo90Context } from "../../../common/context";
import Image from "next/image";

const Tickets = ({ isWider, isMobile }) => {
  const {
    messageData,
    isHiLoOpen,
    isTicketsStyleNormal,
    setIsTicketsStyleNormal,
    signedNumbers,
    setSignedNumbers
  } = useContext(Bingo90Context);

  const [scrollUpBtnVisible, setScrollUpBtnVisible] = useState(false)

  const audio = {
    add:
      typeof Audio !== "undefined"
        ? new Audio(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/heartbeat.mp3"
          )
        : undefined,
  };

  useEffect(() => {
    const is = messageData.tickets.find(
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

  useEffect(() => {
    if(sorted_tickets.length <= 3){
      setIsTicketsStyleNormal(false)
    }
  },[])

  const refScrollUp = useRef();

  let sorted_tickets = [];
  messageData.tickets.map((tickets) => {
    if (sorted_tickets.some((ticket) => ticket.id === tickets.id) === false) {
      // tickets.numbers_remainings = messageData.tickets
      //   .filter((ticket_) => ticket_.id === tickets.id)
      //   .map((tickets_) => tickets_.numbers_remaining);
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
    // console.log("tickets ", ticket)
    const ticketForgottenNumbers = ticket.numbers.filter(num => messageData.numbersDrawn.includes(num));

    const numbers = (
      <BingoCard
        angle={messageData.angle}
        number={messageData.number}
        winState={messageData.winState}
        selfWin={messageData.selfWin}
        numbers={ticket.numbers}
        ticketId={ticket.id}
        numbersDrawn={messageData.numbersDrawn}
        freeText={""}
        key={index}
        inCardsGame={true}
        inGame={messageData.end}
        winners={messageData.winners}
        isTicketsStyleNormal={isTicketsStyleNormal}
        isMobile={isMobile}
        forgottenNumbers={ticketForgottenNumbers}
        signedNumbers={signedNumbers}
        setSignedNumbers={setSignedNumbers}
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
          ticket_id={ticket.id}
          win={ticket.win}
          isTicketsStyleNormal={isTicketsStyleNormal}
        />
        <div className={ticketsClasses.join(" ")}>
          <div className={ticketsStyles.numbers}>{numbers}</div>
        </div>
      </Animated>
    );
  });

  useEffect(() => {
    console.log("scroll height: ", refScrollUp.current?.scrollTop)
    if(refScrollUp.current?.scrollTop > 50){
      const timeoutId = setTimeout(() => {
        setScrollUpBtnVisible(true);
      }, 9000);

      return () => clearTimeout(timeoutId);
    }else{
      setScrollUpBtnVisible(false)
    }
  }, [refScrollUp.current?.scrollTop])
  
  const toggleTicketsStyle = () => {
    setIsTicketsStyleNormal((prevState) => !prevState);
  };

  return (
    <div
      className={`${
        isWider
          ? ticketsStyles.widerContainer
          : isHiLoOpen 
          ? ticketsStyles.widerContainer
          : ticketsStyles.container
      }`}
      ref={refScrollUp}
    >
      <div className={ticketsStyles.title}>
        <div>
          {sorted_tickets?.length}&nbsp;{sorted_tickets?.length !== 1 ? "CARDS" : "CARD"}
        </div>
          {/* toggle tickets Style */}
          {messageData?.tickets?.length ? (
            <button
              className={`${indexStyle.roundedButton}`}
              onClick={toggleTicketsStyle}
              style={{height:"26px", width:"26px", marginBottom:"2px"}}
            >
              <Image
              alt="pp"
                height={14}
                width={14}
                src={`/static/images/bingo90/${
                  isTicketsStyleNormal ? "twoTicketsIcon" : "fourTicketsIcon"
                }.svg`}
              />
            </button>
          ) : (
            <></>
          )}
      </div>

      <div
        className={
          isTicketsStyleNormal
            ? ticketsStyles.tickets
            : ticketsStyles.ticketsSecondStyle
        }
      >
        {tickets}
      </div>

      {scrollUpBtnVisible && (<Fade when={scrollUpBtnVisible}>
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
      </Fade> )}
    </div>
  );
};

export default Tickets;
