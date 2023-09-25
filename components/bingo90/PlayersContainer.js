import React, { useContext, useEffect, useState } from "react";
import {
  playersContainer,
  jackpotWinCt,
  mobileFeatures,
  jackpot,
  jackpotCoins,
  messageTitle,
  top5Title,
  fire,
  particle,
  starIcon
} from "../../styles/bingo90/players.module.scss";
import BestTickets from "./BestTickets";
import Win from "./Win";
import { Bingo90Context } from "../../common/context";
import Image from "next/image";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayersContainer = ({
  prizes,
  numbersCount,
  creditValue,
  inGame,
  numbersDrawn,
  tickets,
  jackpotWinCount,
  current_number,
  winners,
  numbers_drawn,
  prizeValue,
  winDelay = 3.5,
  messageData,
  currentNumber,
}) => {
  const [messages, setMessages] = useState([]);
  const [jackpotMessageNum, setJackpotMessageNum] = useState(0);
  const [jackpotMessage, setJackpotMessage] = useState(null);
  const [currentWinners, setCurrentWiners] = useState([]);

  const { setIsWinnigNow, playingNow } = useContext(Bingo90Context);

  useEffect(() => {
    setMessages([
      "",
      <div key={Math.random()} className={messageTitle}>
        BINGO
      </div>,
      <span key={Math.random()} className={`${mobileFeatures} ${jackpotWinCt}`}>
        Before {jackpotWinCount} out
      </span>,

      <div
        key={Math.random()}
        className={` w-100 flex align-center justify-center ${jackpot} `}
      >
        <img
          height={26}
          width={26}
          alt="yellow-coin"
          src={"/static/images/option5.png"}
        />
        {numbersCount <= jackpotWinCount ? (
          <span className="luckiestText" style={{ color: "#FF6E40" }}>
            JACKPOT
          </span>
        ) : (
          <span className="luckiestText" style={{ color: "#000" }}>
            JACKPOT
          </span>
        )}
      </div>,

      <div
        key={Math.random()}
        className={` w-100 flex align-center justify-center ${jackpotCoins}`}
      >
        <span>{creditValue?.toLocaleString()}</span>
        <img
          height={30}
          width={30}
          alt="yellow-coin"
          src={"/static/images/yellowCoin.png"}
        />
      </div>,
    ]);
  }, [prizes, numbersCount]);

  const cycleJackpot = () => {
    let next;
    next = jackpotMessageNum + 1;
    if (next >= messages?.length) {
      next = 0;
    }
    setJackpotMessageNum(next);
    if (messages?.length) {
      setJackpotMessage(messages[next]);
    }
  };
  const only_tickets = [];
  if (winners?.length) {
    winners.forEach(({ ticket_id }) => {
      tickets = tickets.map((ticket) => {
        if (ticket.id === ticket_id) {
          ticket.win = true;
          ticket.current_number = current_number;
        }
        if (only_tickets.some((t) => t.id === ticket.id) === false) {
          only_tickets.push(ticket);
          return ticket;
        }
        return ticket;
      });
    });
  }

  useEffect(() => {
    if (winners?.length) {
      const count = winners?.length;
      setTimeout(() => {
        let interval = setInterval(() => {
          setCurrentWiners((previous) => {
            if (previous?.length === 0) {
              clearInterval(interval);
              return [];
            }
            return previous.slice(1);
          });
        }, (winDelay / count) * 1000);
        setCurrentWiners(winners);
      }, 1500);
    }
  }, [winners]);

  useEffect(() => {
    if (currentWinners?.length > 0) {
      setIsWinnigNow(true);
    } else {
      setIsWinnigNow(false);
    }
    if (messageData?.durarion > 0) {
      setIsWinnigNow(false);
    }
  }, [currentWinners?.length, messageData?.durarion]);

  // console.log("Current winners ", currentWinners, tickets)
  if (currentWinners?.length && currentWinners[0].username === "") {
    setTimeout(() => {}, 3000);
  }

  if (currentWinners?.length) {
    return (
      <div className={`${playersContainer} flex flex-column align-center`}>
        <Win
          winner={currentWinners[0]}
          numbers_drawn={numbers_drawn}
          winDelay={winDelay}
          prizeValue={prizeValue}
        />
      </div>
    );
  }
  const parts = 50;
  return (
    <div className="flex flex-column" style={{marginTop:"-15px"}}>
     <div
        className={`${top5Title}`}
        style={{
          color:
            playingNow === "Line"
              ? "#4FE439"
              : playingNow === "2Lines"
              ? "#FCE058"
              : playingNow === "Bingo"
              ? "#FF4B4B"
              : "",
        }}
      >
        <div className={`${starIcon}`} >
          <FontAwesomeIcon icon="ranking-star"/>
        </div>
      </div>
     <div className={`${playersContainer} flex flex-column`}>
     

      <div className={`${fire}`}>
        {Array.from({ length: parts }, (_, index) => (
          <div key={index} className={`${particle}`}></div>
        ))}
      </div>
      
      <BestTickets
        tickets={only_tickets.length > 0 ? only_tickets : tickets}
        messageData={messageData}
      />
    </div>
    
    </div>
  );
};
export default PlayersContainer;
