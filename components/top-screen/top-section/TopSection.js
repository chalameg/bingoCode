import PeopleIcon from "@mui/icons-material/People";
import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AppContext, HomeContext } from "../../../common/context";
import connectWebSocket from "../../../config/socket";
import {
  playersCountLocation,
  playersIcon,
  topSection,
} from "../../../styles/index.module.scss";
import BoardContainer from "../board-container/BoardContainer";
import CrowdContainer from "./crowd-container/CrowdContainer";
import ExitDoor from "./exit-door/ExitDoor";
import SoundControl from "./sound-controller/SoundControl";
import WomanAvatar from "./woman-avatar/WomanAvatar";

const womanAvatars = [
  "/static/images/speaker-typing_1.png",
  "/static/images/speaker-show_1.png",
  "/static/images/speaker-hands_1.png",
  "/static/images/speaker-happy_1.png",
];

const crowdBackgrounds = [
  "/static/images/backgroundBroadcast.png",
  "/static/images/backgroundBroadcast_win1.png",
  "/static/images/backgroundBroadcast_win2.png",
  "/static/images/backgroundBroadcast_win3.png",
];

const TopSection = () => {
  const [viewMode, setViewMode] = useState("loading");
  const { messageData, setMessageData, setGameId, setGameClient } =
    useContext(HomeContext);
  const { setCrowdAudio, setCrowdWinAudio, userData } = useContext(AppContext);
  const [womanAvatar, setWomanAvatar] = useState(womanAvatars[0]);
  const [crowd, setCrowd] = useState(crowdBackgrounds[0]);
  const [currentNor, setCurrentNor] = useState(0);
  const [playCrowd, setPlayCrowd] = useState(false);
  const gameStart = useRef(false);
  const playCrowdWinAudio = useRef(false);
  const [crowdAudio] = useState(
    typeof Audio !== "undefined" &&
      !gameStart.current &&
      new Audio(
        "/sounds/crowds/crowd" + (Math.floor(Math.random() * 3) + 1) + ".mp3"
      )
  );
  const [crowdWinAudio] = useState(
    typeof Audio !== "undefined" &&
      !gameStart.current &&
      new Audio(
        "/sounds/crowds/crowd" + (Math.floor(Math.random() * 3) + 1) + "end.mp3"
      )
  );
  const { loading } = useContext(AppContext);
  const [isUserCountVisible, setIsUserCountVisible] = useState(true);

  const inGame = useRef(true);
  const current_number = useRef(null);
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false);
  // const [womanAvatarInterval, setWomanAvatarInterval] = useState(0);
  const [TicketsWithOneNumber, setTicketsWithOneNumber] = useState([]);

  const get_closest_winning_tickets = (all_tickets)=>{
    const new_tickets = []
    all_tickets && all_tickets.map(ticket=>{
      ticket?.numbers_remaining && ticket.numbers_remaining.map(numbers_remaining=>{
            const cloned_ticket = {...ticket}
              cloned_ticket.numbers_remaining = [...numbers_remaining]
              cloned_ticket.numbers_remainings = [...ticket.numbers_remaining]
              new_tickets.push(cloned_ticket)
          }
          )
        }
      )
  
    new_tickets.sort((a, b) => {
      return (
        (a?.numbers_remaining?.length || 0) - (b?.numbers_remaining?.length || 0)
        );
      });
    setTicketsWithOneNumber(new_tickets)
    return new_tickets
  }

  const get_tickets_with_one_number = ()=>{
    const last_numbers = []
    TicketsWithOneNumber.map(ticket=>{
      if(ticket?.numbers_remaining?.length === 1){
        last_numbers.push(ticket?.numbers_remaining[0])
      }
    })
    return last_numbers
  }


  useEffect(() => {
    localStorage.setItem("soundEnabled", true);
  }, []);

  const playCrowdWin = () => {
    const flag = localStorage.getItem("soundEnabled");
    playCrowdWinAudio.current = true;
    var crowdWinAudios = flag ? crowdWinAudio : undefined;
    setCrowdWinAudio(crowdWinAudios);
    crowdWinAudios && (crowdWinAudios.volume = 0.1);
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");

      if (flag === "true") {
        crowdWinAudios.play();
      }
    }
  };

  const playCrowdAudio = () => {
    const flag = localStorage.getItem("soundEnabled");
    var crowdSound = flag ? crowdAudio : undefined;
    crowdSound && (crowdSound.volume = 0.1);
    setCrowdAudio(crowdSound);
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");

      if (flag === "true") {
        crowdSound.play();
      }
    }

    crowdSound &&
      crowdSound.addEventListener(
        "ended",
        () => {
          setCrowdAudio(null);
          var crowdSound = flag ? crowdAudio : undefined;
          crowdSound && (crowdSound.volume = 0.1);
          setCrowdAudio(crowdSound);
          const ISSERVER = typeof window === "undefined";
          if (!ISSERVER) {
            const flag = localStorage.getItem("soundEnabled");

            if (flag === "true") {
              crowdSound.play();
            }
          }
        },
        false
      );
  };

  const playNumber = (number) => {
    const flag = localStorage.getItem("soundEnabled");

    const numberAudio = flag
      ? typeof Audio !== "undefined" &&
        number &&
        gameStart.current &&
        new Audio(
          "/sounds/numbers/" +
            number +
            "-" +
            (Math.floor(Math.random() * 2) + 1) +
            ".mp3"
        )
      : undefined;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      if (flag === "true") {
        numberAudio && numberAudio.play();
      }
    }
  };

  useEffect(() => {
    playNumber(currentNor);
  }, [currentNor]);

  useEffect(() => {
    playCrowd && playCrowdAudio();
  }, [playCrowd]);

  const doTurnStep = (step) => {
    setMessageData({
      ...messageData,
      turnStep: { step, turn: previous?.game?.numbers_drawn?.length },
    });
  };

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);
    gameStart.current = true;
    if (jsonData?.game?.id) {
      setGameId(jsonData?.game?.id);
    }
    switch (jsonData.type) {
      case "draw":
        setPlayCrowd(true);
        playCrowdWinAudio.current = false;

        setViewMode("game");
        // crowdWinAudio.pause();
        // crowdWinAudio.currentTime = 0;
        // setCrowdWinAudio(null);
        // if (womanAvatar !== womanAvatars[0]) {
        // sp avatar wont refresh when countdown is reached
        if (
          inGame.current &&
          jsonData.game.numbers_drawn?.length > 0 &&
          current_number.current !==
            jsonData.game.numbers_drawn[jsonData.game.numbers_drawn?.length - 1]
        ) {
          setWomanAvatar(womanAvatars[0]);
          setTimeout(() => {
            setWomanAvatar(womanAvatars[1]);
          }, 1000);
          setCrowd(crowdBackgrounds[0]);
        }
        // }
        setMessageData((previous) => {
          if (
            previous.type === "end" ||
            previous.type === "scheduled" ||
            (previous?.duration && previous?.duration > 0)
            //  || !(jsonData?.game?.next_prizes && previous?.nextPrizes)
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
            winState: false,
            //
            tickets: get_closest_winning_tickets(jsonData?.tickets),
            end: false,
            stopBuyCard: false,
            //
            drawDelay: 3,
            nextPrizes:
              jsonData?.game?.next_prizes ||
              previous?.nextPrizes ||
              previous?.game?.next_prizes ||
              [],
            inGame: true,
            duration: 0,
            tickets_with_one_number: get_tickets_with_one_number(),
            doTurnStep,
            numbersCount: jsonData?.game?.numbers_drawn?.length || 0,
            number: _.last(jsonData?.game?.numbers_drawn),
            closestWinningTickets: [].concat(
              get_closest_winning_tickets(jsonData?.game?.all_tickets)
            ),
            ticketsIds: (get_closest_winning_tickets(jsonData?.game?.all_tickets) || []).map(
              ({ id }) => id
            ),
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

            setCurrentNor(currentNumber);
            playNumber();

            current_number.current = currentNumber;
          }
        }

        break;
      case "win":
        setPlayCrowd(false);

        setWomanAvatar(womanAvatars[2]);
        setCrowd(crowdBackgrounds[1]);
        setTimeout(() => {
          setWomanAvatar(womanAvatars[3]);
          setCrowd(crowdBackgrounds[2]);
          setTimeout(() => {
            setCrowd(crowdBackgrounds[3]);
          }, 1500);
        }, 1500);

        // crowdAudio.pause();
        // crowdAudio.currentTime = 0;
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
            const iWin = jsonData.win.tickets.some(
              (ticket) => ticket.username === userData.username
            );

            if (iWin) {
              const flag = localStorage.getItem("soundEnabled");
              const iWinAudio =
                typeof Audio !== "undefined" && flag
                  ? new Audio("/sounds/crowds/ChachingBingo.mp3")
                  : undefined;
              iWinAudio && (iWinAudio.volume = 0.1);
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                if (flag === "true") {
                  play_after(iWinAudio);
                }
              }
            }

            if (jsonData.win.prize_name.toLowerCase() === "bingo") {
              winDelay += 10;

              const flag = localStorage.getItem("soundEnabled");

              const winAudio =
                typeof Audio !== "undefined" && flag
                  ? new Audio(
                      "/sounds/vocals/bingo" +
                        (Math.floor(Math.random() * 3) + 1) +
                        ".mp3"
                    )
                  : undefined;
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                if (flag === "true") {
                  // winAudio.play();
                  play_after(winAudio);
                }
              }
            } else if (jsonData.win.prize_name.toLowerCase() === "jackpot") {
              // winAudio.play();
              // winDelay += 10;
            } else {
              const flag = localStorage.getItem("soundEnabled");

              const winAudio =
                typeof Audio !== "undefined" && flag
                  ? new Audio(
                      "/sounds/vocals/congrats" +
                        (Math.floor(Math.random() * 3) + 1) +
                        ".mp3"
                    )
                  : undefined;
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                if (flag === "true") {
                  // winAudio.play();
                  play_after(winAudio);
                }
              }
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
        setWomanAvatar(womanAvatar[0]);
        inGame.current = false;
        setMessageData((previous) => ({
          ...previous,
          // ...jsonData,
          end: true,
        }));
        break;
      case "scheduled":
        setPlayCrowd(false);

        // crowdWinAudio.pause();
        // crowdWinAudio.currentTime = 0;
        // setCrowdWinAudio(null);

        playCrowdWin();
        setMessageData((previous) => ({
          ...previous,
          // ...jsonData,
          inGame: false,
          duration: jsonData.countdown,
        }));
        inGame.current = false;
        setWomanAvatar(womanAvatars[2]);
        setCrowd(crowdBackgrounds[1]);
        setViewMode("countdown");
        setTimeout(() => {
          setViewMode("loading");
          setMessageData((previous) => ({ ...previous, duration: 0 }));
        }, (jsonData.countdown + 1) * 1000);
        break;
      case "new":
        var startAudios = [
          "/sounds/vocals/eyesdown1.mp3",
          "/sounds/vocals/eyesdown3.mp3",
          "/sounds/vocals/firstnumber1.mp3",
          "/sounds/vocals/firstnumber2.mp3",
        ];
        var startAudio =
          startAudios[Math.floor(Math.random() * startAudios?.length) + 1];
        playAnnouncement(startAudio);
        inGame.current = true;
        setCrowd(crowdBackgrounds[1]);
        setViewMode("loading");
        setMessageData((previous) => ({
          ...previous,
          ...jsonData,
          tickets: get_closest_winning_tickets(jsonData?.tickets),
        }));
        break;
      default:
        break;
    }
  };

  const playAnnouncement = (audioFile) => {
    const flag = localStorage.getItem("soundEnabled");

    var audio =
      typeof Audio !== "undefined" && flag ? new Audio(audioFile) : undefined;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (flag === "true") {
        audio.play();
      }
    }
  };

  const makePageFullScreen = () => {
    console.log(window.innerHeight, window.innerWidth);
    if (document.fullscreenEnabled) {
      if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
      } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      } else if (document.body.requestFullscreen) {
        document.body
          .requestFullscreen({ navigationUI: "show" })
          .then(() => {})
          .catch(() => {}); // standard
      }
      setIsFullscreenEnabled(true);
    }
  };

  const exitFullScreen = () => {
    document.exitFullscreen();
    setIsFullscreenEnabled(false);
  };

  useEffect(() => {
    const client = connectWebSocket("/ws/game/", (message) =>
      onGameMessageReceived(message)
    );
    setGameClient(client);
    // const interval = setInterval(() => {
    //   setWomanAvatar((oldState) =>
    //     oldState === womanAvatars[0] ? womanAvatars[1] : (womanAvatars.slice(2).includes(oldState) ? oldState : womanAvatars[0])
    //   );
    // }, 1500);
    // setWomanAvatarInterval(interval)
    return function () {
      // clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    loading ? setIsUserCountVisible(false) : setIsUserCountVisible(true);
  }, [loading]);

  return (
    <div className={topSection}>
      <ExitDoor />
      <SoundControl
        winAudio={crowdWinAudio}
        crowdAudio={crowdAudio}
        playWin={playCrowdWinAudio.current}
      />
      <WomanAvatar avatar={womanAvatar} />
      <BoardContainer viewMode={viewMode} messageData={messageData} />
      <CrowdContainer crowd={crowd} />

      <div key={Math.random()} className={`${playersCountLocation} flex`}>
        {isUserCountVisible & (messageData.type !== "new") ? (
          <span
            key={Math.random()}
            title={"Players"}
            className="w-100 flex align-center justify-center pr-20"
          >
            <span style={{ marginRight: "2px", color: "#fff" }}>
              {messageData.playersCount}
            </span>
            <PeopleIcon className={`${playersIcon}`} />
          </span>
        ) : (
          <></>
        )}

        <div>
          {isFullscreenEnabled ? (
            <div onClick={exitFullScreen}>
              <AiOutlineFullscreenExit />
            </div>
          ) : (
            <div onClick={makePageFullScreen}>
              <BsArrowsFullscreen />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TopSection;
