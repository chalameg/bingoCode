import { app } from "../../styles/bingo90/index.module.scss";
import { useEffect, useState } from "react";
import { Bingo90Context } from "../../common/context";
import connectWebSocket90 from "../../config/socket90";
import Head from "next/head";
import Bingo90Home from "../../components/bingo90/Home";
import { useRouter } from "next/router";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";

const Home = () => {
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
  const [isPurchaseCardsOpen, setIsPurchaseCardsOpen] = useState(false);
  const [luckyNumbers, setLuckyNumbers] = useState(null);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [jackpotPrize, setJackpotPrize] = useState(null);
  const [bingoPrize, setBingoPrize] = useState(null);
  const [twoLinePrize, setTwoLinePrize] = useState(null);
  const [linePrize, setLinePrize] = useState(null);
  const [isMiddleBarButtonsVisible, setIsMiddleBarButtonsVisible] =
    useState(true);
  const [viewMode, setViewMode] = useState("loading");
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [isWinningNow, setIsWinnigNow] = useState(false);
  const [clickedIndexies, setClickedIndexies] = useState({});
  const [isNewGame, setIsNewGame] = useState(false);
  const [totalBet, setTotalBet] = useState(0);
  const [isBettedHilo, setIsBettedHilo] = useState(false);
  const [luckyBetOpen, setLuckyBetOpen] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [previousBalance, setPreviousBalance] = useState(null);
  const [chipsAmount, setChipsAmount] = useState(1);
  const [matrixTickets, setMatrixTickets] = useState([])
  const [isTicketsStyleNormal, setIsTicketsStyleNormal] = useState(true)
  const [luckySent, setLuckySent] = useState(false);
  const [luckyInfoDialogOpen, setLuckyInfoDialogOpen] = useState(false);
  const [luckyDialogOpen, setLuckyDialogOpen] = useState(false)
  const [signedNumbers, setSignedNumbers] = useState([])
  const [playingNow, setPlayingNow] = useState('');

  const router = useRouter();

  const Bingo90ContextValue = {
    messageData,
    coinClient,
    setGameId,
    setCoinClient,
    setMessageData,
    playerBalance,
    setPlayerBalance,
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
    luckyNumbers,
    setLuckyNumbers,
    currentWinner,
    setCurrentWinner,
    jackpotPrize,
    setJackpotPrize,
    bingoPrize,
    setBingoPrize,
    twoLinePrize,
    setTwoLinePrize,
    linePrize,
    setLinePrize,
    isMiddleBarButtonsVisible,
    setIsMiddleBarButtonsVisible,
    viewMode,
    setViewMode,
    isBuyClicked,
    setIsBuyClicked,
    isWinningNow,
    setIsWinnigNow,
    clickedIndexies,
    setClickedIndexies,
    isNewGame,
    setIsNewGame,
    totalBet,
    setTotalBet,
    isBettedHilo,
    setIsBettedHilo,
    luckyBetOpen,
    setLuckyBetOpen,
    isWon,
    setIsWon,
    previousBalance,
    setPreviousBalance,
    chipsAmount,
    setChipsAmount,
    matrixTickets,
    setMatrixTickets,
    isTicketsStyleNormal,
    setIsTicketsStyleNormal,
    luckySent,
    setLuckySent,
    luckyInfoDialogOpen,
    setLuckyInfoDialogOpen,
    luckyDialogOpen,
    setLuckyDialogOpen,
    signedNumbers,
    setSignedNumbers,
    playingNow,
    setPlayingNow
  };

  useEffect(() => {
    const token = localStorage.getItem(BINGO_ACCESS_TOKEN_KEY) ?? "";
    if (token == "" && router.pathname !== "") {
      router.push("/");
    }
  }, [router]);

  return (
    <Bingo90Context.Provider value={Bingo90ContextValue}>
      <Head>
        <title>Bingo 90</title>
      </Head>
      <div className={`${app} flex flex-column`}>
        <Bingo90Home />
      </div>
    </Bingo90Context.Provider>
  );
};
export default Home;
