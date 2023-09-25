import React from "react";
import LandingPage from "../components/landing-page/LandingPage";

import { useEffect, useState, useContext } from "react";
import { AppContext, HomeContext } from "../common/context";
import connectWebSocket from "../config/socket";
import Head from "next/head";

const Index = () => {
  const [messageData, setMessageData] = useState({});
  const [playerBalance, setPlayerBalance] = useState(null);
  const [isPlayingHiLo, setIsPlayingHiLo] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [coinClient, setCoinClient] = useState(null);
  const [gameClient, setGameClient] = useState(null);
  const [isHiLoOpen, setIsHiLoOpen] = useState(null);
  const [hiLoDefaultCreditPurchase, setHiLoDefaultCreditPurchase] =
    useState(10);
  const [purchaseCardDefaultCredit, setPurchaseCardDefaultCredit] = useState(5);
  const [isPurchaseCardsOpen, setIsPurchaseCardsOpen] = useState(null);

  const { isLoggedIn, isOnLandingPage } = useContext(AppContext);
  const onPlayerMessageReceived = (message) => {
    const data = JSON.parse(message.data);
    if (data?.game?.id) {
      setGameId(data?.game?.id);
    }
    if (parseInt(data?.credit_balance, 10) < 100) {
      setPlayerBalance(
        parseInt(data?.credit_balance, 10).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      setPlayerBalance(
        parseInt(data?.credit_balance, 10).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      );
    }
  };
  useEffect(() => {
    connectWebSocket("/ws/player/", onPlayerMessageReceived);
  }, []);
  const homeContextValue = {
    messageData,
    coinClient,
    setGameId,
    setCoinClient,
    setMessageData,
    playerBalance,
    gameId,
    isPlayingHiLo,
    setIsPlayingHiLo,
    gameClient,
    setGameClient,
    isHiLoOpen,
    setIsHiLoOpen,
    hiLoDefaultCreditPurchase,
    setHiLoDefaultCreditPurchase,
    purchaseCardDefaultCredit,
    setPurchaseCardDefaultCredit,
    isPurchaseCardsOpen,
    setIsPurchaseCardsOpen,
  };

  return (
    <HomeContext.Provider value={homeContextValue}>
      <div>
        <Head>
          <meta name="author" content="chala" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <LandingPage />
        <style jsx global>
          {`
            html,
            body {
              background-image: linear-gradient(
                #3b1103,
                #3b1103,
                #3b1103,
                #7f5aef
              ) !important;
            }
          `}
        </style>
      </div>
    </HomeContext.Provider>
  );
};
export default Index;
