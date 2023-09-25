import prizesStyles from "../../../styles/prizes.module.css";
import React, { useEffect, useState } from "react";
import {
  playersContainer,
  jackpotMessageContainerStyle,
  playersCountLocation,
  jackpotWinCt,
  mobileFeatures,
  jackpot,
  jackpotCoins,
  bestTickets,
  messageTitle,
} from "../../../styles/players.module.css";
import BestTickets from "./BestTickets";
import Win from "../game-views/Win";

const PlayersContainer = ({
  prizes,
  numbersCount,
  ticketsCount,
  playersCount,
  creditValue,
  inGame,
  numbersDrawn,
  tickets,
  ticketsIds,
  current_number,
  jackpotWinCount,
  winners,
  numbers_drawn,
  prizeValue,
  winDelay = 3.5,
  jackpotWinValue,
}) => {
  const [messages, setMessages] = useState([]);
  const [jackpotMessageNum, setJackpotMessageNum] = useState(0);
  const [jackpotMessage, setJackpotMessage] = useState(null);
  const [currentWinners, setCurrentWiners] = useState([]);
  
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
        <span>{creditValue.toLocaleString()}</span>
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
  const only_tickets = []
  if (winners?.length) {
    winners.forEach(({ ticket_id }) => {
      tickets = tickets.map((ticket) => {
        if (ticket.id === ticket_id) {
          ticket.win = true;
          ticket.current_number = current_number;
        }
        if(only_tickets.some(t=> t.id === ticket.id) === false){
          only_tickets.push(ticket)
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

  if (currentWinners?.length) {
    return (
      <div className={`${playersContainer} h-100 flex flex-column`}>
        <Win
          winner={currentWinners[0]}
          numbers_drawn={numbers_drawn}
          winDelay={winDelay}
          prizeValue={
            prizes[0]?.name === "Bingo"
              ? prizeValue + jackpotWinValue
              : prizeValue
          }
        />
      </div>
    );
  }
  return (
    <div
      className={`${playersContainer} flex flex-column align-center justify-end`}
    >
      <div className={`flex w-100 ${jackpotMessageContainerStyle}`}>
        {/* {messages[jackpotMessageNum]} */}
        {messages}
      </div>
      <BestTickets tickets={only_tickets.length > 0 ? only_tickets:tickets} />
    </div>
  );
};
export default PlayersContainer;
