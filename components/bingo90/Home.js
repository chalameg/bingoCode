import { useMediaQuery } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext, Bingo90Context } from "../../common/context";
import connectWebSocket90 from "../../config/socket90";
import style from "../../styles/bingo90/index.module.scss";
import luckyStyle from "../../styles/bingo90/luckyNumbers.module.scss";
import Loader from "./UI/B90Loader";
import Jackpot from "./Jackpot";
import PlayersContainer from "./PlayersContainer";
import MobileTopBar from "./TopBar";
import LuckyNumbersBet from "./UI/LuckyNumbersBet";
import LuckyNumbersInfo from "./UI/LuckyNumbersInfo";
import BottomSection from "./bottom-container/BottomSection";
import Ball from "./current-container/Ball";
import GameCountdown from "./game/GameCountdown";
import LuckWonPopUp from "./UI/LuckWonPopUp";
import Hilo from "./UI/Hilo";
import DraggableDialog from "./UI/DraggableDialog";
import { IoClose } from "react-icons/io5";
import TabletActionButtons from "./TabletActionButtons";

class CustomAudio {
  constructor(src) {
    this.audio = new Audio(src);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.audio.muted = isSafari;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
  addEventListener(eventType, callback) {
    this.audio.addEventListener(eventType, callback);
  }

  removeEventListener(eventType, callback) {
    this.audio.removeEventListener(eventType, callback);
  }
}

function Home() {
  const { setCrowdAudio, setCrowdWinAudio, setCrowdInBetweenAudio, userData } =
    useContext(AppContext);
  const {
    messageData,
    setMessageData,
    setGameId,
    setGameClient,
    isHiLoOpen,
    setIsMiddleBarButtonsVisible,
    viewMode,
    setViewMode,
    setTwoLinePrize,
    setLinePrize,
    setJackpotPrize,
    setBingoPrize,
    setIsPurchaseCardsOpen,
    isWinningNow,
    totalBet,
    setTotalBet,
    setPlayerBalance,
    isBettedHilo,
    setIsBettedHilo,
    setCoinClient,
    setIsPlayingHiLo,
    hiLoDefaultCreditPurchase,
    setHiLoDefaultCreditPurchase,
    isPlayingHiLo,
    setIsWon,
    previousBalance,
    setPreviousBalance,
    setMatrixTickets,
    setSignedNumbers,
    luckyBetOpen,
    setLuckyBetOpen,
    coinClient,
  } = useContext(Bingo90Context);

  const [currentBingo90Nor, setCurrentBingo90Nor] = useState(0);
  const [playBingo90Crowd, setPlayBingo90Crowd] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [TicketsWithOneNumber, setTicketsWithOneNumber] = useState([]);
  const [userLuckyWinning, setUserLuckyWinning] = useState(null);

  const [posFlipped, setPosFlipped] = useState(false);
  const [luckyInfoOpen, setLuckyInfoOpen] = useState(false);

  const get_closest_winning_tickets = (all_tickets) => {
    const new_tickets = [];
    all_tickets &&
      all_tickets.map((ticket) => {
        ticket?.numbers_remaining &&
          ticket.numbers_remaining.map((numbers_remaining) => {
            const cloned_ticket = { ...ticket };
            // if (numbers_remaining.length){
            cloned_ticket.numbers_remaining = [...numbers_remaining];
            cloned_ticket.numbers_remainings = [...ticket.numbers_remaining];
            new_tickets.push(cloned_ticket);
            // }
          });
      });

    new_tickets.sort((a, b) => {
      return (
        (a?.numbers_remaining?.length || 0) -
        (b?.numbers_remaining?.length || 0)
      );
    });
    setTicketsWithOneNumber(new_tickets);
    return new_tickets;
  };

  const get_tickets_with_one_number = () => {
    const last_numbers = [];
    TicketsWithOneNumber.map((ticket) => {
      if (ticket?.numbers_remaining?.length === 1) {
        last_numbers.push(ticket?.numbers_remaining[0]);
      }
    });
    return last_numbers;
  };

  useEffect(() => {
    const matrixTickets = get_tickets_with_one_number()
      ? get_tickets_with_one_number()
      : [];

    setMatrixTickets(matrixTickets);
  }, [messageData]);

  const gameStart = useRef(false);
  const playCrowdWinAudio = useRef(false);
  const crowdInBetween = useRef(false);

  const [crowdBingo90Audio] = useState(
    typeof Audio !== "undefined" &&
      !gameStart.current &&
      new CustomAudio(
        "/sounds/crowds/crowdbingo90" +
          (Math.floor(Math.random() * 3) + 1) +
          ".wav"
      )
  );

  const [crowdbingo90WinAudio] = useState(
    typeof Audio !== "undefined" &&
      !gameStart.current &&
      new CustomAudio(
        "/sounds/crowds/crowdbingo90win" +
          (Math.floor(Math.random() * 5) + 1) +
          ".wav"
      )
  );

  const [crowdbingo90InBetweenAudio] = useState(
    typeof Audio !== "undefined" &&
      !gameStart.current &&
      new CustomAudio(
        "/sounds/crowds/crowdbingo90InBetween" +
          (Math.floor(Math.random() * 3) + 1) +
          ".wav"
      )
  );

  // const [crowdAudio, setCrowdAudio] = useState(null);

  const inGame = useRef(true);

  const totalBetRef = useRef(0);

  const current_number = useRef(null);

  useEffect(() => {
    localStorage.setItem("soundEnabled", true);
  }, []);

  const doTurnStep = (step) => {
    setMessageData({
      ...messageData,
      turnStep: { step, turn: previous?.game?.numbers_drawn?.length },
    });
  };

  const playCrowd = () => {
    const flag = localStorage.getItem("soundEnabled");
    var crowdBingo90Sound = flag ? crowdBingo90Audio : undefined;
    crowdBingo90Sound && (crowdBingo90Sound.volume = 1);
    setCrowdAudio(crowdBingo90Sound);
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");

      if (flag === "true") {
        crowdBingo90Sound.play();
      }
    }

    crowdBingo90Sound &&
      crowdBingo90Sound?.addEventListener(
        "ended",
        () => {
          setCrowdAudio(null);
          var crowdBingo90Sound = flag ? crowdBingo90Audio : undefined;
          crowdBingo90Sound && (crowdBingo90Sound.volume = 1);
          setCrowdAudio(crowdBingo90Sound);
          const ISSERVER = typeof window === "undefined";
          if (!ISSERVER) {
            const flag = localStorage.getItem("soundEnabled");

            if (flag === "true") {
              crowdBingo90Sound.play();
            }
          }
        },
        false
      );
  };

  const playCrowdWin = () => {
    const flag = localStorage.getItem("soundEnabled");
    playCrowdWinAudio.current = true;
    var crowdWinAudios = flag ? crowdbingo90WinAudio : undefined;
    setCrowdWinAudio(crowdWinAudios);
    crowdWinAudios && (crowdWinAudios.volume = 1);
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");

      if (flag === "true") {
        crowdWinAudios.play();
      }
    }
  };

  const playCrowdInBetween = () => {
    const flag = localStorage.getItem("soundEnabled");
    playCrowdWinAudio.current = true;
    var crowdInBetween = flag ? crowdbingo90InBetweenAudio : undefined;
    setCrowdInBetweenAudio(crowdInBetween);
    crowdInBetween && (crowdInBetween.volume = 1);
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");

      if (flag === "true") {
        crowdInBetween.play();
      }
    }
  };

  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

  const isTablet = (useMediaQuery("(max-width:920px) and (min-height: 450px)") & useMediaQuery("(min-width:540px) and (min-height: 450px)")) | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

  const playBingo90Number = (number) => {
    const flag = localStorage.getItem("soundEnabled");

    const numberBingo90Audio = flag
      ? typeof Audio !== "undefined" &&
        number &&
        gameStart.current &&
        new CustomAudio("/sounds/numbers/bingo90/spanish" + number + ".mp3")
      : undefined;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      if (flag === "true") {
        numberBingo90Audio && numberBingo90Audio.play();
      }
    }
  };

  useEffect(() => {
    playBingo90Number(currentBingo90Nor);
  }, [currentBingo90Nor]);

  useEffect(() => {
    if (playBingo90Crowd) playCrowd();
  }, [playBingo90Crowd]);

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);

    gameStart.current = true;
    if (jsonData?.game?.id) {
      setGameId(jsonData?.game?.id);
    }
    switch (jsonData.type) {
      case "draw":
        setPlayBingo90Crowd(true);
        crowdInBetween.current = false;

        playCrowdWinAudio.current = false;
        setViewMode("game");
        // crowdbingo90WinAudio.pause();
        // crowdbingo90WinAudio.currentTime = 0;
        // setCrowdWinAudio(null);
        // crowdbingo90InBetweenAudio.pause();
        // crowdbingo90InBetweenAudio.currentTime = 0;
        // setCrowdInBetweenAudio(null);
        setIsMiddleBarButtonsVisible(true);
        setMessageData((previous) => {
          if (
            previous.type === "end" ||
            previous.type === "scheduled" ||
            (previous?.duration && previous?.duration > 0)
          ) {
            return previous;
          }
          return {
            ...previous,
            ...jsonData,
            gameId: jsonData?.game?.id,
            creditBalance: jsonData?.credit_balance,
            playerWin: {
              mode: Math.round(Math.random() + 2),
              turn: jsonData?.game?.numbers_drawn?.length,
            },
            numbersDrawn: jsonData?.game?.numbers_drawn || [],
            highLowCreditValue: jsonData.highlow_credit_value,
            jackpotCreditValue: jsonData.jackpot_credit_value,
            jackpotWinCount: jsonData.jackpot_win_count,
            playersCount: jsonData?.game?.player_count || 0,
            ticketsCount: jsonData?.game?.ticket_count,
            tickets_with_one_number: get_tickets_with_one_number(),
            winState: false,
            tickets: get_closest_winning_tickets(jsonData?.tickets),
            end: false,
            stopBuyCard: false,
            drawDelay: 3,
            nextPrizes:
              jsonData?.game?.next_prizes ||
              previous?.nextPrizes ||
              previous?.game?.next_prizes ||
              [],
            inGame: true,
            duration: 0,
            doTurnStep,
            numbersCount: jsonData?.game?.numbers_drawn?.length || 0,
            closestWinningTickets: [].concat(
              get_closest_winning_tickets(jsonData?.game?.all_tickets)
            ),
            ticketsIds: (
              get_closest_winning_tickets(jsonData?.game?.all_tickets) || []
            ).map(({ id }) => id),
            winners: [],
          };
        });

        if (
          jsonData.game.numbers_drawn &&
          jsonData.game.numbers_drawn?.length > 0
        ) {
          if (
            current_number.current !==
            jsonData.game.numbers_drawn[jsonData.game.numbers_drawn?.length - 1]
          ) {
            var currentNumber =
              jsonData.game.numbers_drawn[
                jsonData.game.numbers_drawn?.length - 1
              ];
            setCurrentBingo90Nor(currentNumber);
            playBingo90Number();

            current_number.current = currentNumber;
          }
        }
        break;
      case "win":
        crowdInBetween.current = false;
        setPlayBingo90Crowd(false);
        // crowdBingo90Audio.pause();
        // crowdBingo90Audio.currentTime = 0;
        // setCrowdAudio(null);
        setMessageData((previous) => {
          const winners = [];
          const others = [];
          previous.tickets.forEach((ticket) => {
            let win = false;
            for (let t of jsonData.win.tickets) {
              if (t.ticket_id === ticket.id) {
                win = true;
                break;
              }
            }
            if (win) {
              winners.push({ ...ticket, win: true });
            } else {
              others.push(ticket);
            }
          });
          let winDelay = previous.winDelay;
          const play_after = (winAudio) => {
            setTimeout(() => {
              winAudio.play();
            }, 2500);
          };
          if (jsonData.win) {
            console.log("win data ", jsonData.win);
            const iWin = jsonData.win.tickets.some(
              (ticket) => ticket.username === userData.username
            );

            if (iWin) {
              const flag = localStorage.getItem("soundEnabled");
              const iWinAudio =
                typeof Audio !== "undefined" && flag
                  ? new CustomAudio("/sounds/crowds/ChachingBingo.mp3")
                  : undefined;
              iWinAudio && (iWinAudio.volume = 0.1);
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                if (flag === "true") {
                  play_after(iWinAudio);
                }
              }
            }

            if (jsonData.win.prize_name === "1 Line") {
              const winAudio =
                typeof Audio !== "undefined"
                  ? new CustomAudio(
                      "/sounds/vocals/bingo90/line" +
                        (Math.floor(Math.random() * 2) + 1) +
                        ".mp3"
                    )
                  : undefined;
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  play_after(winAudio);
                }
              }
            } else if (jsonData.win.prize_name === "2 Lines") {
              const winAudio =
                typeof Audio !== "undefined"
                  ? new CustomAudio("/sounds/vocals/bingo90/congrats.mp3")
                  : undefined;
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  play_after(winAudio);
                }
              }
            } else if (jsonData.win.prize_name === "Bingo") {
              winDelay += 10;
              const winAudio =
                typeof Audio !== "undefined"
                  ? new CustomAudio("/sounds/vocals/bingo90/bingo.mp3")
                  : undefined;
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (flag === "true") {
                  play_after(winAudio);
                }
              }
            } else if (jsonData.win.prize_name.toLowerCase() === "jackpot") {
            }
          }

          playCrowdWin();
          return {
            ...previous,
            ...jsonData,
            nextPrizes:
              jsonData?.game?.next_prizes ||
              previous?.nextPrizes ||
              previous?.game?.next_prizes ||
              [],
            tickets: [].concat(winners).concat(others),
            winners: jsonData.win.tickets,
            current_number: current_number.current,
            inGame: true,
            game: { ...previous?.game, game_prizes: jsonData.win.win_numbers },
            jackpotWinValue:
              jsonData.win.prize_name === "Jackpot"
                ? jsonData.win.credit_value / jsonData.win.tickets?.length
                : 0,
            winDelay,
          };
        });

        break;
      case "prize_won_delay":
        setMessageData((previous) => {
          return {
            ...previous,
            ...jsonData,
            winners: [],
            winDelay:
              parseInt(jsonData?.prize_delay || "3.5", 10) +
              parseInt(jsonData?.draw_delay || "0", 10),
          };
        });
        break;
      case "end":
        inGame.current = false;
        setMessageData((previous) => ({
          ...previous,
          end: true,
        }));
        break;
      case "scheduled":
        crowdInBetween.current = true;
        // crowdbingo90WinAudio.pause();
        // crowdbingo90WinAudio.currentTime = 0;
        // setCrowdWinAudio(null);
        playCrowdInBetween();

        setMessageData((previous) => ({
          ...previous,
          inGame: false,
          duration: jsonData.countdown,
        }));
        inGame.current = false;
        setViewMode("countdown");
        setIsMiddleBarButtonsVisible(false);
        setIsPurchaseCardsOpen(true);

        setTimeout(() => {
          setViewMode("loading");

          setMessageData((previous) => ({ ...previous, duration: 0 }));
        }, (jsonData.countdown + 1) * 1000);

        break;
      case "new":
        var startAudios = [
          "/sounds/vocals/bingo90/start1.mp3",
          "/sounds/vocals/bingo90/start2.mp3",
          "/sounds/vocals/bingo90/start3.mp3",
          "/sounds/vocals/bingo90/start4.mp3",
        ];
        var startAudio =
          startAudios[Math.floor(Math.random() * startAudios.length) + 1];
        playAnnouncement(startAudio);
        inGame.current = true;
        setViewMode("loading");
        setIsMiddleBarButtonsVisible(true);
        setMessageData((previous) => ({
          ...previous,
          ...jsonData,
          tickets: get_closest_winning_tickets(jsonData?.tickets),
        }));
        setLinePrize(null);
        setTwoLinePrize(null);
        setBingoPrize(null);
        setJackpotPrize(null);
        setSignedNumbers([]);
        setTotalBet(0);

        setTimeout(() => {}, 5000);
        break;
      default:
        break;
    }
  };

  const playAnnouncement = (audioFile) => {
    const flag = localStorage.getItem("soundEnabled");

    var audio =
      typeof Audio !== "undefined" && flag ? new CustomAudio(audioFile) : undefined;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (flag === "true") {
        audio.play();
      }
    }
  };

  useEffect(() => {
    const client = connectWebSocket90("/ws/90/game/", (message) =>
      onGameMessageReceived(message)
    );
    setGameClient(client);
  }, []);

  useEffect(() => {
    connectWebSocket90("/ws/90/lucky_numbers/90/", (message) =>
      onLuckyMessageReceived(message)
    );
  }, []);

  const onLuckyMessageReceived = (message) => {
    const luckyData = JSON.parse(message.data);

    setUserLuckyWinning(luckyData.win);

    setTimeout(() => {
      setUserLuckyWinning(null);
    }, 3000);
  };

  const onPlayerMessageReceived = (message) => {
    const data = JSON.parse(message.data);
    setCurrentBalance(data.credit_balance);
    const balance = data.credit_balance - totalBetRef.current;

    if (data?.game?.id) {
      setGameId(data?.game?.id);
    }
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
    totalBetRef.current = totalBet;
    if (
      (messageData?.duration !== 0 && messageData?.duration < 3) ||
      (messageData?.duration && messageData?.type === "win")
    ) {
      totalBetRef.current = 0;
    }
    if (!isWinningNow) {
      connectWebSocket90("/ws/player/", onPlayerMessageReceived);
    }
  }, [isWinningNow, isBettedHilo, messageData?.duration, messageData?.type]);

  useEffect(() => {
    if (previousBalance === null) {
      setPreviousBalance(currentBalance);
    } else {
      // console.log(previousBalance, " ", currentBalance)
      if (previousBalance < currentBalance) {
        setIsWon(true);
        setTimeout(() => {
          setIsWon(false);
          setPreviousBalance(currentBalance);
        }, 2500);
      } else {
        setPreviousBalance(currentBalance);
      }
    }
  }, [currentBalance]);

  const currentNumber = messageData?.game?.numbers_drawn
    ? messageData.game.numbers_drawn[messageData.game.numbers_drawn?.length - 1]
    : 0;
  const prizeValue = messageData?.nextPrizes?.length
    ? messageData.nextPrizes[0].credit_value
    : 0;

  const range = (start, end) => {
    return Array.apply(0, Array(end)).map((element, index) => index + start);
  };

  const numbersForLuckyNumberSelection = range(1, 90);

  const toggleLuckBet = () => {
    setLuckyBetOpen((prevState) => !prevState);
  };

  const highLowCollect = () => {
    if (coinClient?.readyState === 1) {
      const audio =
        typeof Audio !== "undefined"
          ? new CustomAudio("/sounds/buttons/collect.mp3")
          : undefined;

      const ISSERVER = typeof window === "undefined";

      if (!ISSERVER) {
        const flag = localStorage.getItem("soundEnabled");
        if (flag === "true") {
          audio.play();
        }
      }

      setMessageData((previous) => {
        return {
          ...previous,
          collect: true,
        };
      });

      setTimeout(() => {
        setMessageData((previous) => {
          return {
            ...previous,
            collect: false,
          };
        });
      }, 3000);

      coinClient.send(
        JSON.stringify({
          type: "collect",
        })
      );

      setIsBettedHilo(!isBettedHilo);
    }
  };

  return (
    <>
      <div className={`flex flex-column ${style.topContainer}`}>
        <MobileTopBar
          bingo90winAudio={crowdbingo90WinAudio}
          bingo90crowdAudio={crowdBingo90Audio}
          bingo90InBetween={crowdbingo90InBetweenAudio}
          inBetween={crowdInBetween.current}
          playWin={playCrowdWinAudio.current}
        >
          {!isMobile ? <Jackpot /> : <></>}
        </MobileTopBar>
        {isMobile ? <Jackpot />: <></>}

        {messageData.type === "new" ||
        messageData.type === "scheduled" ||
        viewMode === "loading" ? (
          <Loader />
        ) : viewMode === "game" && messageData?.inGame ? (
          <div
            className={`flex ${style.topSection} ${
              !isMobile || isTablet ? "justify-between" : ""
            }`}
          >
            <div
              style={{ width: isMobile ? "68%" : "45%" }}
              className={`flex ${!isMobile ? "flex gap-6" : ""}`}
            >
              {/* desktop hilo container */}
              {!isMobile && (
                <div
                  style={{
                    width: "42%",
                    height: "363px",
                    marginTop: "-60px",
                    zIndex: "1300",
                  }}
                >
                  <DraggableDialog width={"fit-content"}>
                    <Hilo
                      messageData={messageData}
                      currentNumber={currentNumber}
                      isHiLoOpen={isHiLoOpen}
                      isMobile={isMobile}
                      isPlayingHiLo={isPlayingHiLo}
                      posFlipped={posFlipped}
                      setPosFlipped={setPosFlipped}
                      setIsBettedHilo={setIsBettedHilo}
                      setCoinClient={setCoinClient}
                      setIsPlayingHiLo={setIsPlayingHiLo}
                      hiLoDefaultCreditPurchase={hiLoDefaultCreditPurchase}
                      setHiLoDefaultCreditPurchase={
                        setHiLoDefaultCreditPurchase
                      }
                      setMessageData={setMessageData}
                      highLowCollect={highLowCollect}
                    />
                  </DraggableDialog>
                </div>
              )}

              {/* tablet action buttons */}
              {isTablet  ? <TabletActionButtons/> : <></>}
              
              {/* ball */}
              <Ball
                number={currentNumber}
                messageData={messageData}
                isMobile={isMobile}
              />
            </div>

            <PlayersContainer
              showWinners={messageData.showWinners}
              winners={messageData.winners}
              number={messageData.number}
              prizes={messageData.nextPrizes}
              numbersCount={messageData.numbersCount}
              ticketsCount={messageData.ticketsCount}
              playersCount={messageData.playersCount}
              creditValue={messageData.jackpotCreditValue}
              inGame={messageData.inGame}
              numbersDrawn={messageData.numbersDrawn}
              tickets={messageData.closestWinningTickets || []}
              ticketsIds={messageData.ticketsIds}
              prizeValue={prizeValue / (messageData?.winners?.length || 1)}
              jackpotWinCount={messageData.jackpotWinCount}
              winDelay={messageData.winDelay}
              numbers_drawn={messageData?.game?.numbers_drawn}
              current_number={messageData.current_number}
              jackpotWinValue={messageData?.jackpotWinValue}
              messageData={messageData}
              currentNumber={currentNumber}
            />

            {!isMobile && (
              <div className={`flex flex-column ${luckyStyle.luckInfoSection}`}>
                <div className={`flex gap-2 items-center ${luckyStyle.luckyInfoTitle}` }>
                  <span>Lucky Numbers</span>
                  <img src="/static/images/bingo90/touchIcon.svg"/>
                </div>
                <LuckyNumbersInfo
                  numbersForLuckyNumberSelection={
                    numbersForLuckyNumberSelection
                  }
                  one_number_tickets={
                    get_tickets_with_one_number()
                      ? get_tickets_with_one_number()
                      : []
                  }
                />
                {/* action buttons and lucky game info */}
                {!isMobile && !luckyBetOpen && (
                  <div
                    className="flex flex-column items-center justify-center"
                    style={{ marginTop: "15px", position: "relative" }}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ width: "100%", paddingLeft: "30%" }}
                    >
                      <button
                        onClick={toggleLuckBet}
                        className={style.luckyButton}
                      >
                        <span className={`flex items-center ${style.openBetButtonText}`}>
                          PLAY
                          <span
                            className={luckyStyle.luckyInButton}
                            style={{
                              background: "rgba(255, 255, 255, 0.68)",
                              marginLeft: "10px",
                            }}
                          >
                            55
                          </span>
                          <span
                            className={luckyStyle.luckyInButton}
                            style={{
                              background: "#4FE439",
                              marginLeft: "3px",
                            }}
                          >
                            56
                          </span>
                          <span
                            className={luckyStyle.luckyInButton}
                            style={{
                              background: "rgba(255, 255, 255, 0.68)",
                              marginLeft: "3px",
                            }}
                          >
                            57
                          </span>
                          <div style={{ position: "relative" }}>
                            <img
                              src="/static/images/bingo90/chips-10.svg"
                            />
                          </div>
                        </span>
                      </button>

                      <button
                        className={`${luckyStyle.button} ${luckyStyle.btnInfo}`}
                        onClick={() => setLuckyInfoOpen(true)}
                      ></button>
                    </div>

                    {luckyInfoOpen ? (
                      <div
                      className={luckyStyle.luckyDescrition}
                      >
                        <span>
                          Guess what numbers will be the ones to call at the
                          moments of winnings. The numbers you bet on will
                          multiply-
                        </span>

                        <div className="flex justify-between align-center p-10 raleway-bold">
                          <h6
                            style={{
                              color: "#4FE439",
                              textShadow:
                                "1px 1px 13px rgba(144, 255, 125, 0.5)",
                            }}
                          >
                            LINE x15
                          </h6>

                          <h6
                            style={{
                              color: "#FCE058",
                              textShadow:
                                "1px 1px 13px rgba(252, 224, 88, 0.5)",
                            }}
                          >
                            2 LINES x25
                          </h6>

                          <h6
                            style={{
                              color: "#FF4B4B",
                              textShadow: "1px 1px 13px rgba(255, 75, 75, 0.5)",
                            }}
                          >
                            BINGO x45
                          </h6>
                        </div>

                        <div
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Good Luck!
                        </div>

                        <div
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "5px",
                          }}
                        >
                          <IoClose
                            style={{ color: "gray" }}
                            onClick={() => setLuckyInfoOpen(false)}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            )}

            {!isMobile && luckyBetOpen && (
              <div className={luckyStyle.luckyBetSection}>
                <DraggableDialog>
                  <LuckyNumbersBet />
                </DraggableDialog>
              </div>
            )}
          </div>
        ) : (
          <div className={`flex justify-between  ${style.topSection}`}>
            
            {isTablet ? 
              <div style={{position:'absolute', top: '16%', left:'7%'}}>
                <TabletActionButtons/>
              </div>
              : <></>}

            <GameCountdown duration={messageData.duration} />

            {!isMobile && messageData?.duration && (
              <div style={{ marginTop: "-10px" }}>
                <LuckyNumbersInfo
                  numbersForLuckyNumberSelection={
                    numbersForLuckyNumberSelection
                  }
                  one_number_tickets={
                    get_tickets_with_one_number()
                      ? get_tickets_with_one_number()
                      : []
                  }
                />
              </div>
            )}

            {!isMobile && (
              <div style={{ position: "absolute", right: "1.5%", top: "11%" }}>
                <DraggableDialog>
                  <LuckyNumbersBet />
                </DraggableDialog>
              </div>
            )}
          </div>
        )}
      </div>

      {/* bottom section */}
      <BottomSection />

      {userLuckyWinning && (
        <LuckWonPopUp
          line={userLuckyWinning?.prize_name}
          amountWon={userLuckyWinning?.credit_value}
          numberCreatedWon={userLuckyWinning?.win_number}
        />
      )}
    </>
  );
}

export default Home;
