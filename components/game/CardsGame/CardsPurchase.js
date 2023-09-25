import {
  priceButton,
  purchaseCardsStyle,
  purchaseButton,
  mobileLandscapeView,
} from "../../../styles/home.module.scss";
import Button from "../../common/button/Button";
import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../../common/context";
import connectWebSocket from "../../../config/socket";
import swal from "sweetalert2";

import TimeRemaining from "./TimeRemaining";

const CardsPurchase = () => {
  const {
    gameClient,
    messageData,
    purchaseCardDefaultCredit,
    setPurchaseCardDefaultCredit,
  } = useContext(HomeContext);
  const [purchaseCards, setPurchaseCards] = useState(
    purchaseCardDefaultCredit || 5
  );
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const updatePurchaseCardsNumber = (val) => {
    setPurchaseCards((old) => (val + old < 1 ? 1 : val + old));
    setPurchaseCardDefaultCredit((old) => (val + old < 1 ? 1 : val + old));
  };

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

  // console.log("Message Data:", messageData)
  const buyCards = () => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (flag === "true") {
        audio.play.play();
      }
    }
    gameClient.send(
      JSON.stringify({
        type: "buy_tickets",
        bingo_size: 75,
        count: purchaseCards,
      })
    );
    setIsPressed(true);
    // setPurchaseCards(5);
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
      // console.log(data, "--onmessage---");
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
    const client = connectWebSocket("/ws/tickets/75/", onmessage);
    return () => {
      client.close();
    };
  }, []);

  return (
    <div>
      {messageData?.tickets?.length == 0 && <TimeRemaining />}

      <p className={`text-center mb ${mobileLandscapeView}`} style={{marginTop:"10px"}}>
        <span className={`${mobileLandscapeView}`} style={{ color: "#ea6524", fontSize: "24px", fontWeight: "bold" }}>
          {numberOfCards}
        </span>{" "}
        <span className={`luckiestText ${mobileLandscapeView}`} style={{ color:"#11298A", fontSize: "24px", fontWeight: "bolder" }}>
          CARDS{" "}
        </span>
         for{" "}
        <span className={`${mobileLandscapeView}`} style={{ color: "#ea6524", fontSize: "24px", fontWeight: "bolder" }}>
          NEXT GAME
        </span>
      </p>
      <div className={`mb flex align-center justify-center`}>
        <Button
          buttonText={"-10"}
          className={priceButton}
          onClick={() => {
            updatePurchaseCardsNumber(-10);
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
          className={priceButton}
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
        <div className={`flex align-center ${purchaseCardsStyle}`}>
          <span>{purchaseCards.toLocaleString()}</span>
        </div>
        <Button
          buttonText={"+1"}
          className={priceButton}
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
          buttonText={"+10"}
          className={priceButton}
          onClick={() => {
            updatePurchaseCardsNumber(10);
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
      <div className={`mb flex align-center justify-center`}>
        {!messageData?.stopBuyCard && (
          <Button
            onClick={buyCards}
            //  disabled={["end", "scheduled", "new"].indexOf(messageData.type) !== -1 || !messageData.type}
            className={`pressed ${
              isPressed ? "active" : ""
            } ${purchaseButton} orangeButton`}
            buttonText={
                <span className="luckiestBtn">Buy</span>
             
            }
          />
        )}
      </div>
    </div>
  );
};
export default CardsPurchase;
