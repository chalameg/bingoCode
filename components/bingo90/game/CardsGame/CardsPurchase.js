import Button from "../../../common/button/Button";
import React, { useContext, useEffect, useState } from "react";
import { Bingo90Context } from "../../../../common/context";
import connectWebSocket90 from "../../../../config/socket90";
import swal from "sweetalert2";
import style from "../../../../styles/bingo90/index.module.scss";
import styles from "../../../../styles/bingo90/purchase.module.scss";
import TimeRemaining from "./TimeRemaining";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import bottomStyle from "../../../../styles/bingo90/bottom.module.scss";

const CardsPurchase = (props) => {
  const {
    gameClient,
    messageData,
    purchaseCardDefaultCredit,
    setPurchaseCardDefaultCredit,
    isHiLoOpen,
    isPurchaseCardsOpen,
    viewMode,
    totalBet,
    playerBalance,
    setPlayerBalance,
    luckySent,
  } = useContext(Bingo90Context);

  const [purchaseCards, setPurchaseCards] = useState(
    purchaseCardDefaultCredit || 5
  );
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));
  const updatePurchaseCardsNumber = (val) => {
    setPurchaseCards((old) => (val + old < 1 ? 1 : val + old));
    setPurchaseCardDefaultCredit((old) => (val + old < 1 ? 1 : val + old));
  };

  const [isContainerStyleGray, setIsContainerStyleGray] = useState(true);

  const audio = {
    add:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/add.mp3")
        : undefined,
    subtract:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/subtract.mp3")
        : undefined,
    play:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/playBuyButton.mp3")
        : undefined,
  };

  const buyCards = () => {
    if (luckySent) return;
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (flag === "true") {
        audio.play.play();
      }
    }

    const balance = parseInt(playerBalance.toLocaleString().replace(/\D/g, ""));

    //check if purchaseCards*10 > playerbalance

    if (purchaseCards * 10 > balance) {
      new swal({
        icon: "error",
        title: "You don't have enough money to buy cards.",
        button: "Ok",
      });
      return;
    }

    gameClient?.send(
      JSON.stringify({
        type: "buy_tickets",
        bingo_size: 90,
        count: purchaseCards,
      })
    );

    connectWebSocket90("/ws/player/", onPlayerMessageReceived);

    setIsPressed(true);
  };

  const onPlayerMessageReceived = (message) => {
    const data = JSON.parse(message.data);

    const balance = data.credit_balance - totalBet;

    if (parseInt(balance, 10) < 100) {
      setPlayerBalance(
        parseInt(balance, 10).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      setPlayerBalance(
        parseInt(balance, 10).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      );
    }
  };

  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        setIsPressed(false);
      }, 1000);
    }
  }, [isPressed]);

  useEffect(() => {
    const onmessage = (message) => {
      const data = JSON.parse(message?.data);
      if (data?.tickets) {
        setNumberOfCards(data?.tickets?.length || 0);
      }
      if (data?.type === "warning") {
        new swal({
          title: "Insufficient Credits!",
          icon: "warning",
        });
      }
    };

    const client = connectWebSocket90("/ws/90/tickets/90/", onmessage);

    return () => {
      client.close();
    };
  }, [isPressed]);

  useEffect(() => {
    let interval;

    if (numberOfCards > 0 || messageData?.tickets?.length > 0) {
      interval = setInterval(() => {
        setIsContainerStyleGray((prevState) => !prevState);
      }, 13000);
    } else {
      interval = setInterval(() => {
        setIsContainerStyleGray((prevState) => !prevState);
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [numberOfCards]);

  return (
    <div className={`${props.className}`}>
      {messageData?.tickets?.length === 0 && messageData?.inGame && (
        <TimeRemaining isContainerStyleGray={isContainerStyleGray} />
      )}

      <div
        className={`${styles.cardsInfoContainer} ${
          isContainerStyleGray ? styles.grayContainer : styles.whiteContainer
        }`}
      >
        <span>{numberOfCards}&nbsp;</span>

        <Image
          src={`/static/images/bingo90/${
            isContainerStyleGray ? "card" : "orangeCard"
          }.svg`}
          height={20}
          width={20}
          alt="card"
        />

        <div>
          &nbsp;cards for <span>NEXT GAME</span>
        </div>
      </div>

      <div className={`flex align-center justify-center`}>
        <Button
          buttonText={"-5"}
          className={style.coinCounterButton}
          onClick={() => {
            updatePurchaseCardsNumber(-5);
            const ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
              const flag = localStorage.getItem("soundEnabled");
              if (flag === "true") {
                audio.subtract.play();
              }
            }
          }}
        />

        <Button
          buttonText={"-1"}
          className={style.coinCounterButton}
          onClick={() => {
            updatePurchaseCardsNumber(-1);
            const ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
              const flag = localStorage.getItem("soundEnabled");
              if (flag === "true") {
                audio.subtract.play();
              }
            }
          }}
        />

        {!messageData?.stopBuyCard && (
          <Button
            onClick={buyCards}
            className={`${isContainerStyleGray ? style.bingo90Button : style.bingo90ButtonWhiteBg}`}
            buttonText={
              <span>
                Buy <span>{purchaseCards.toLocaleString()}</span>{" "}
                {/* <img src={`/static/images/bingo90/${isContainerStyleGray?'card':'orangeCard'}.svg`} /> */}
              </span>
            }
          />
        )}

        <Button
          buttonText={"+1"}
          className={style.coinCounterButton}
          onClick={() => {
            updatePurchaseCardsNumber(1);
            const ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
              const flag = localStorage.getItem("soundEnabled");
              if (flag === "true") {
                // playActive;
              }
            }
          }}
        />
        <Button
          buttonText={"+5"}
          className={style.coinCounterButton}
          onClick={() => {
            updatePurchaseCardsNumber(5);
            const ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
              const flag = localStorage.getItem("soundEnabled");
              if (flag === "true") {
                // playActive;
              }
            }
          }}
        />
      </div>

      <div className={styles.purchaseContainer}>
        <div className={styles.purchasePrice}>
          {purchaseCards.toLocaleString()}&nbsp;
          <img
            src="/static/images/bingo90/card.svg"
            alt="card"
          />
          &nbsp;=&nbsp;{purchaseCards * 10}
          <span>
            <img
              src="/static/images/yellowCoin.png"
              alt="coin"
            />
          </span>
        </div>
      </div>

      {viewMode != "countdown" &&
      !messageData?.countdown &&
      numberOfCards === 0 &&
      messageData?.tickets?.length === 0 &&
      !isHiLoOpen ? (
        <div className={`${bottomStyle.gameInProgressMessage} ${isContainerStyleGray ? bottomStyle.defaultStyle : bottomStyle.orangeStyle}`}>
          {messageData?.inGame && <div>Game in progress...</div>}

          <div className="flex align-center justify-center mb-5">
            Buy &nbsp;
            <Image
              src={`/static/images/bingo90/${isContainerStyleGray ? 'card' : 'orangeCard'}.svg`}
              height={15}
              width={15}
              alt="card"
            />{" "}
            &nbsp; cards for the next round
          </div>
        </div>
      ) : (
        <></>
      )}

    </div>
  );
};
export default CardsPurchase;
