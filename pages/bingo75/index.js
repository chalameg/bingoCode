import { app } from "../../styles/index.module.scss";
import TopSection from "../../components/top-screen/top-section/TopSection";
import BottomSection from "../../components/bottom-section/BottomSection";
import { useEffect, useState, useContext } from "react";
import { AppContext, HomeContext } from "../../common/context";
import connectWebSocket from "../../config/socket";
import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const Router = useRouter();
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

  useEffect(() => {
    !isLoggedIn && Router.push("/");
  }, [Router, isLoggedIn]);

  const onPlayerMessageReceived = (message) => {
    const data = JSON.parse(message.data);
    if (data?.game?.id) {
      setGameId(data?.game?.id);
    }
    if (parseInt(data.credit_balance, 10) < 100) {
      setPlayerBalance(
        parseInt(data.credit_balance, 10).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      setPlayerBalance(
        parseInt(data.credit_balance, 10).toLocaleString(undefined, {
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
      <Head>
        <title>Bingo 75</title>
      </Head>
      <div className={`${app} flex flex-column`}>
        <TopSection />
        <BottomSection />
      </div>
    </HomeContext.Provider>
  );
};
export default Home;
