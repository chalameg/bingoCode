import { useState, useContext, useEffect } from "react";
import HiLoGame from "./HiLoGame";
import HiLoPurchase from "./HiLoPurchase";
import { HiLoContext, HomeContext } from "../../../common/context";
import AppDialog from "../../common/app-dialog/AppDialog";
import connectWebSocket from "../../../config/socket";

const HiLo = ({
  toggleAudio,
  handleOptionsSwitch,
  setReconnecting,
  handleUserDashboard,
}) => {
  const [amount, setAmount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("none");
  const { gameId, coinClient, setCoinClient, messageData } =
    useContext(HomeContext);

  const audio = {
    timeToBet:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/timeToBet.mp3")
        : undefined,
    add:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/add.mp3")
        : undefined,
    subtract:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/subtract.mp3")
        : undefined,
    win:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/win.mp3")
        : undefined,
    lose:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/lose.mp3")
        : undefined,
    play:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/playBuyButton.mp3")
        : undefined,
    collect:
      typeof Audio !== "undefined"
        ? new Audio("/sounds/buttons/collect.mp3")
        : undefined,
    // timeToBet: {
    // 	volume: 0.5
    // },
  };

  const [wsReady, setWsReady] = useState(false);
  const [noMoreBets, setNoMoreBets] = useState(false);
  const [creditPurchase, setCreditsPurchase] = useState(10);
  const [bet, setBet] = useState(0);
  const [flash, setFlash] = useState({
    up: false,
    down: false,
  });
  useEffect(() => {
    connectHighLow();
    return () => {
      // coinClient ? coinClient.close() : null;
      // setCoinClient(null);
    };
  }, [gameId]);

  const cacheImages = (images) => {
    images.forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
  };
  const updateAmount = (val) => {
    setAmount((prev) => {
      const newValue = prev + val;
      if (newValue < 1) {
        return 1;
      }
      return newValue;
    });
  };
  const play = () => {
    console.log(coinClient);
    highLowBet();
    setIsPlaying(true);
    setAmount(1);
  };
  /*componentDidUpdate(prevProps, prevState) {
    if (this.state.bet) {
      highData =
        Number(this.props.highWinnings * this.state.bet.credit_value) > 0
          ? (this.props.highWinnings * this.state.bet.credit_value)?.toFixed(
              2
            ) < 100
            ? (this.props.highWinnings * this.state.bet.credit_value)?.toFixed(
                2
              )
            : (
                this.props.highWinnings * this.state.bet.credit_value
              )?.toLocaleString(undefined, { maximumFractionDigits: 0 })
          : 0;
      lowData =
        Number(this.props.lowWinnings * this.state.bet.credit_value) > 0
          ? this.props.lowWinnings * this.state.bet.credit_value < 100
            ? Number(
                this.props.lowWinnings * this.state.bet.credit_value
              ).toFixed(2)
            : Number(
                this.props.lowWinnings * this.state.bet.credit_value
              ).toLocaleString(undefined, { maximumFractionDigits: 0 })
          : 0;
    }

    if (this.props.gameId && prevProps.gameId !== this.props.gameId) {
      this.connectHighLow();
    }
    if (!prevState.bet && this.state.bet) {
      flashTimer = setTimeout(() => {
        this.toggleFlash();
      }, 200);
      //      this.setState({ flashTimer: flashTimer });
    }
    if (prevProps.currentNumber !== this.props.currentNumber) {
      setTimeout(() => {
        if (
          this.state.bet &&
          !this.state.bet.direction &&
          (this.props.highWinnings || this.props.lowWinnings) &&
          this.props.toggleAudio
        ) {
          this.audio.timeToBet.play();
        }
      }, 200);
      this.setState({ noMoreBets: false });
      setTimeout(() => {
        this.setState({ noMoreBets: true });
        if (!this.state.bet || (this.state.bet && !this.state.bet.direction)) {
          this.setState({ upFlash: 0 });
          this.setState({ downFlash: 0 });
        }
      }, 2500);
      setTimeout(() => {
        this.toggleFlash();
      }, 200);
    }
  }*/

  const toggleFlash = () => {
    if (bet && !noMoreBets) {
      if (!bet.direction) {
        if (flash.up) {
          setFlash({
            up: false,
            down: true,
          });
        } else {
          setFlash({
            up: true,
            down: false,
          });
        }
        setTimeout(() => {
          toggleFlash();
        }, 200);
      } else {
        if (bet.direction === "LOW") {
          setFlash({
            up: false,
            down: true,
          });
        } else {
          setFlash({
            up: true,
            down: false,
          });
        }
      }
    }
  };
  const onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data, messageData);
    switch (data.type) {
      case "credit":
        if (bet) {
          if (toggleAudio) {
            const flag = localStorage.getItem("soundEnabled");
            if (
              data.bet &&
              data.bet.credit_value > bet.credit_value &&
              flag === "true"
            ) {
              audio.win.play();
            } else if (!data.bet && flag === "true") {
              audio.lose.play();
            }
          }
        }
        setIsPlaying(true);
        setBet(data.bet);
        break;
      case "warning":
        swal({
          title: "Insufficient Credit!",
          icon: "warning",
        }).then(() => {
          handleOptionsSwitch(1);
          handleUserDashboard(true);
        });
        break;
      default:
        break;
    }
  };
  const connectHighLow = () => {
    // this.setState({bet: null});
    if (coinClient) {
      coinClient.close();
      setCoinClient(null);
    }

    if (gameId) {
      const client = connectWebSocket(
        "/ws/highlow/" + gameId + "/",
        onmessage,
        setReconnecting
      );
      setCoinClient(client);
    }
  };
  const pollWS = () => {
    setWsReady(false);
    setTimeout(() => {
      if (coinClient?.readyState !== 1) {
        pollWS();
      } else {
        setWsReady(true);
      }
    }, 1000);
  };
  /*
  componentWillUnmount() {
    if (coinClient) {
      coinClient.close();
    }
    clearTimeout(flashTimer);
  }
  */

  const onDirectionChange = (event) => {
    highLowDirection(event.target.value);
    if (event.target.value === "low") {
      setFlash({
        up: false,
        down: true,
      });
    } else {
      setFlash({
        up: true,
        down: false,
      });
    }
  };

  const waitSend = (message, callback) => {
    waitForConnection(function () {
      coinClient.send(message);
      if (typeof callback !== "undefined") {
        callback();
      }
    });
  };

  const waitForConnection = (callback, interval) => {
    if (coinClient?.readyState === 1) {
      callback();
    } else {
      setTimeout(function () {
        waitForConnection(callback);
      }, 1000);
    }
  };
  const highLowBet = () => {
    //this.audio.play.play();
    if (coinClient?.readyState === 1) {
      coinClient.send(
        JSON.stringify({
          type: "bet",
          credit_value: amount,
        })
      );
    }
  };

  const highLowCollect = () => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (toggleAudio && flag === "true") {
        audio.collect.play();
      }
    }
    if (coinClient?.readyState === 1) {
      coinClient.send(
        JSON.stringify({
          type: "collect",
        })
      );
    }
  };

  const highLowDirection = (direction) => {
    audio.timeToBet.pause();
    if (coinClient?.readyState === 1) {
      coinClient.send(
        JSON.stringify({
          type: "direction",
          direction,
        })
      );
    }
  };

  const setCredits = (value) => {
    setCreditsPurchase(value);
  };

  /*From Old*/

  const select = (val) => {
    setSelected(val);
    highLowDirection(val);
  };
  const hiLoContextValue = {
    amount,
    updateAmount,
    isPlaying,
    setIsPlaying,
    play,
    selected,
    select,
    bet,
    highLowDirection,
  };
  return (
    <HiLoContext.Provider value={hiLoContextValue}>
      {isPlaying ? <HiLoGame /> : <HiLoPurchase />}
      <AppDialog
        isOpen={isOpen}
        title={"High-Low Game"}
        handleClose={() => {
          setIsOpen(false);
        }}
      >
        some text here
      </AppDialog>
    </HiLoContext.Provider>
  );
};
export default HiLo;
