import React, { Component } from "react";
import highLowStyles from "../../../../styles/bingo90/highLow.module.scss";
import buyTicketsStyles from "../../../../styles/bingo90/buyTickets.module.css";
import { desktopFeatures } from "../../../../styles/bingo90/home.module.scss";
import style from "../../../../styles/bingo90/index.module.scss";
import swal from "sweetalert2";
import connectWebSocket90 from "../../../../config/socket90";
import HiLoPurchase from "./HiLoPurchase";
import AppDialog from "../../../common/app-dialog/AppDialog";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
  HiArrowNarrowUp
} from "react-icons/hi";
import Button from "../../../common/button/Button";

let highData, lowData, ws, flashTimer;
const mainColor = "#273fa3";

class HighLow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditPurchase: this?.props?.hiLoDefaultCreditPurchase || 10,
      bet: 0,
      noMoreBets: false,
      dialogIsOpen: false,
      upFlash: 0,
      downFlash: 0,
      WSReady: true,
    };

    this.onDirectionChange = this.onDirectionChange.bind(this);

    this.audio = {
      timeToBet:
        typeof Audio !== "undefined"
          ? new Audio("/sounds/buttons/timeToBet_2.mp3")
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
    };
  }

  componentDidMount() {
    this.connectHighLow();
  }

  cacheImages = (images) => {
    images.forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
  };

  componentDidUpdate(prevProps, prevState) {
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
    }
    if (prevProps.currentNumber !== this.props.currentNumber) {
      setTimeout(() => {
        const ISSERVER = typeof window === "undefined";
        if (!ISSERVER) {
          const flag = localStorage.getItem("soundEnabled");
          if (
            this.state.bet &&
            !this.state.bet.direction &&
            (this.props.highWinnings || this.props.lowWinnings) &&
            flag === "true"
          ) {
            this.audio.timeToBet.play();
          }
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
  }

  toggleFlash = () => {
    if (this.state.bet && !this.state.noMoreBets) {
      if (!this.state.bet.direction) {
        if (this.state.upFlash === 1) {
          this.setState({ upFlash: 0 });
          this.setState({ downFlash: 1 });
        } else {
          this.setState({ upFlash: 1 });
          this.setState({ downFlash: 0 });
        }
        setTimeout(() => {
          this.toggleFlash();
        }, 200);
      } else {
        if (this.state.bet.direction === "LOW") {
          this.setState({ upFlash: 0 });
          this.setState({ downFlash: 1 });
        } else {
          this.setState({ upFlash: 1 });
          this.setState({ downFlash: 0 });
        }
      }
    }
  };

  connectHighLow = () => {
    if (this.client) {
      this.props.setIsPlayingHiLo(false);
      this.client.close();
    }

    var onmessage = (message) => {
      var data = JSON.parse(message.data);

      switch (data.type) {
        case "credit":
          if (this.state.bet) {
            const ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
              const flag = localStorage.getItem("soundEnabled");
              if (
                data.bet &&
                data.bet.credit_value > this.state.bet.credit_value &&
                flag === "true"
              ) {
                this.audio.win.play();
              } else if (!data.bet && flag === "true" && !this.props?.collect) {
                this.audio.lose.play();
              }
            }
          }
          if (data.bet === null) {
            this.props.setIsPlayingHiLo(false);
          }
          this.setState({ bet: data.bet });
          break;
        case "warning":
          swal({
            title: "Insufficient Credit!",
            icon: "warning",
          }).then(() => { });
          break;
        default:
          break;
      }
    };

    if (this.props.gameId) {
      this.client = connectWebSocket90(
        "/ws/90/highlow/" + this.props.gameId + "/",
        onmessage,
        this.props.setReconnecting
      );
      this.props.setClient(this.client);
    }
  };

  pollWS = () => {
    this.setState({ WSReady: false });
    setTimeout(() => {
      if (this.client?.readyState !== 1) {
        this.pollWS();
      } else {
        this.setState({ WSReady: true });
      }
    }, 1000);
  };

  componentWillUnmount() {
    this.props.setIsPlayingHiLo(false);
    if (this.client) {
      this.client.close();
    }
    clearTimeout(flashTimer);
  }

  onDirectionChange = (event) => {
    const value = event.target.value;
    this.highLowDirection(value);
    if (value === "low") {
      this.setState({ upFlash: 0 });
      this.setState({ downFlash: 1 });
    } else {
      this.setState({ upFlash: 1 });
      this.setState({ downFlash: 0 });
    }
  };

  waitSend = (message, callback) => {
    ws = this.client;
    this.waitForConnection(function () {
      ws.send(message);
      if (typeof callback !== "undefined") {
        callback();
      }
    });
  };

  waitForConnection = (callback, interval) => {
    ws = this.client;
    if (ws.readyState === 1) {
      callback();
    } else {
      var that = this;
      setTimeout(function () {
        that.waitForConnection(callback);
      }, 1000);
    }
  };

  highLowBet = () => {
    if (this.client?.readyState === 1) {
      const ISSERVER = typeof window === "undefined";
      if (!ISSERVER) {
        const flag = localStorage.getItem("soundEnabled");
        if (flag === "true") {
          this.audio.play.play();
        }
      }

      this.client.send(
        JSON.stringify({
          type: "bet",
          credit_value: this.state.creditPurchase,
        })
      );

      this.props.setIsPlayingHiLo(true);

      this.props.setIsBettedHilo(true);
    } else {
      //  this.pollWS()
    }
  };

  highLowCollect = () => {
    if (this.client?.readyState === 1) {
      const audio =
        typeof Audio !== "undefined"
          ? new Audio("/sounds/buttons/collect.mp3")
          : undefined;

      const ISSERVER = typeof window === "undefined";

      if (!ISSERVER) {
        const flag = localStorage.getItem("soundEnabled");
        if (flag === "true") {
          audio.play();
        }
      }

      this.props.setMessageData((previous) => {
        return {
          ...previous,
          collect: true,
        };
      });

      setTimeout(() => {
        this.props.setMessageData((previous) => {
          return {
            ...previous,
            collect: false,
          };
        });
      }, 3000);

      this.client?.send(
        JSON.stringify({
          type: "collect",
        })
      );

      this.props.setIsBettedHilo(!this.props.isBettedHilo);
    }
  };

  highLowDirection = (direction) => {
    this.audio.timeToBet.pause();
    if (this.client?.readyState === 1) {
      this.client.send(
        JSON.stringify({
          type: "direction",
          direction,
        })
      );
    } else {
      // this.pollWS()
    }
  };

  addCredits = (value) => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (this.props.toggleAudio && flag === "true") {
        this.audio.add.play();
      }
    }
    this.setState({ creditPurchase: this.state.creditPurchase + value });
    this.props.setHiLoDefaultCreditPurchase(
      this.props.hiLoDefaultCreditPurchase + value
    );
  };

  removeCredits = (value) => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (this.props.toggleAudio && flag === "true") {
        this.audio.subtract.play();
      }
    }

    if (this.state.creditPurchase > 1) {
      const newValue = this.state.creditPurchase - value;
      this.setState({ creditPurchase: newValue < 1 ? 1 : newValue });
      this.props.setHiLoDefaultCreditPurchase(newValue < 1 ? 1 : newValue);
    }
  };

  setCredits = (value) => {
    this.setState({ creditPurchase: value });
  };

  isPlaying = () => {
    return this.state.bet;
  };

  render() {
    return (
      <div
        className={`flex align-center justify-center ${highLowStyles.highlowcontainer}`}
      >
        <div>{this.state.flash}</div>
        {this.isPlaying() ? (
          <div className={highLowStyles.buttonContainer}>
            <div className={`flex align-center justify-center`}>
              <div
                className={`  ${highLowStyles.hiloTitle} flex flex-column`}
              >
                {this.props.isPlayingHiLo && (
                  <Button
                    onClick={this.highLowCollect}
                    buttonText="Collect"
                    className={`${style.bingo90Button} ${desktopFeatures}`}
                  />
                )}

                {/* <div className="flex justify-center align-center">
                  <HiOutlineArrowNarrowUp style={{ height: "28px" }} />
                  HI-LO
                  <HiOutlineArrowNarrowDown style={{ height: "28px" }} />
                </div> */}
              </div>

              <label className={highLowStyles.label}>
                {this.state.bet ? (
                  <div>
                    <input
                      className={`${highLowStyles.inputData} ${highLowStyles.radioButton}`}
                      disabled={
                        this.state.noMoreBets || !this.props.highWinnings
                      }
                      type="radio"
                      name="highlow"
                      value="high"
                      onChange={this.onDirectionChange}
                      checked={this.state.bet.direction === "HIGH"}
                    />

                    <div
                      className={`${style.bingo90Button} ${this.state.upFlash ? highLowStyles.lightButton : highLowStyles.dimButton}`}
                    >
                      {this.state.bet ? (
                        <span><HiOutlineArrowNarrowUp />{highData}</span>
                      ) : (
                        <span className={highLowStyles.arrowContent}>
                          HIGH \{" "}
                        </span>
                      )}

                    </div>
                  </div>
                ) : (
                  <div
                    className={[
                      style.bingo90Button,
                      this.state.upFlash ? highLowStyles.lightButton : highLowStyles.dimButton,
                      highLowStyles.disabled,
                    ].join(" ")}
                    alt="up button"
                  >
                    {this.state.bet ? (
                      <span><HiOutlineArrowNarrowUp />{highData}</span>
                    ) : (
                      <span className={highLowStyles.arrowContent}>HIGH</span>
                    )}
                    <div className={highLowStyles.fakeButtonUp}></div>
                  </div>
                )}
              </label>

              <div className={highLowStyles.value}>
                {this.isPlaying() ? (
                  this.state.bet && (
                    <>
                      {this.state.bet.credit_value < 100
                        ? Number(this.state.bet.credit_value).toFixed(0)
                        : Number(this.state.bet.credit_value).toFixed(0)}
                      <img
                        className={highLowStyles.coin}
                        src={"/static/images/blackCoin.png"}
                        alt="coin icon"
                      />
                    </>
                  )
                ) : (
                  <button
                    onClick={() => this.highLowBet()}
                    className={`btn-orange ${buyTicketsStyles.buttonB}`}
                  >
                    Bet
                  </button>
                )}
              </div>

              <label className={highLowStyles.label}>
                {this.state.bet ? (
                  <div>
                    <input
                      className={`${highLowStyles.inputData} ${highLowStyles.radioButton}`}
                      disabled={
                        this.state.noMoreBets || !this.props.lowWinnings
                      }
                      type="radio"
                      name="highlow"
                      value="low"
                      onChange={this.onDirectionChange}
                      checked={this.state.bet.direction === "LOW"}
                    />
                    <div
                      className={`${style.bingo90Button} ${this.state.downFlash ? highLowStyles.lightButton : highLowStyles.dimButton}`}
                    >
                      {this.state.bet ? (
                        <span><HiOutlineArrowNarrowDown />{lowData || 0}</span>
                      ) : (
                        <span className={highLowStyles.arrowContent}>
                          LOW
                        </span>
                      )}

                    </div>
                  </div>
                ) : (
                  <div
                    className={[
                      style.bingo90Button,
                      this.state.downFlash ? highLowStyles.lightButton : highLowStyles.dimButton,
                      highLowStyles.disabled,
                    ].join(" ")}
                    alt="down button"
                  >
                    {this.state.bet ? (
                      <span><HiOutlineArrowNarrowDown />{false || 0}</span>
                    ) : (
                      <span className={highLowStyles.arrowContent}>
                        LOW
                      </span>
                    )}
                    <div className={highLowStyles.fakeButtonDown}></div>
                  </div>
                )}
              </label>
            </div>
          </div>
        ) : (
          <div className={"flex align-center justify-center"}>

            <div className={`${highLowStyles.credits}`}>
              <HiLoPurchase
                play={this.highLowBet}
                addCredits={this.addCredits}
                removeCredits={this.removeCredits}
                amount={this.state.creditPurchase}
                titleColor={this.props.titleColor ? this.props.titleColor : ""}
                openDialog={() => {
                  this.setState({ dialogIsOpen: true });
                }}
              />
            </div>
          </div>
        )}

        <AppDialog
          isOpen={this.state.dialogIsOpen}
          title={"High-Low Game"}
          handleClose={() => {
            this.setState({ dialogIsOpen: false });
          }}
        >
          <div style={{ paddingInline: "33px" }}>
            {" "}
            guess if the next number to drown will be higher or lower than
            current number
          </div>
        </AppDialog>
      </div>
    );
  }
}

export default HighLow;
