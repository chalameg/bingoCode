import React, { Component } from "react";

import highLowStyles from "../../../styles/highLow.module.scss";

import buyTicketsStyles from "../../../styles/buyTickets.module.css";
import swal from "sweetalert2";
import connectWebSocket from "../../../config/socket";
import HiLoPurchaseOld from "./HiLoPurchaseOld";
import AppDialog from "../../common/app-dialog/AppDialog";

let highData, lowData, ws, flashTimer;
const mainColor = "#273fa3";

class HighLow extends Component {
  constructor(props) {
    super(props);
    // const homeContext = this.context

    // console.log(homeContext) //
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
    console.log(this.props.hiLoDefaultCreditPurchase);
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
      //      this.setState({ flashTimer: flashTimer });
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
    // this.setState({bet: null});
    if (this.client) {
      this.props.setIsPlayingHiLo(false);
      this.client.close();
    }
    var onmessage = (message) => {
      var data = JSON.parse(message.data);

      console.log("onConnectHighLow: "+JSON.stringify(data))
      
      switch (data.type) {
        case "credit":
          if (this.state.bet) {
            // console.log('message.',data,this.props.toggleAudio,this.state.bet,data.type,this.audio.win);
            // if (this.props.toggleAudio) {
              const ISSERVER = typeof window === "undefined";
              if (!ISSERVER) {
                const flag = localStorage.getItem("soundEnabled");
                if (
                  data.bet &&
                  data.bet.credit_value > this.state.bet.credit_value &&
                  flag === "true"
                ) {
                  this.audio.win.play();
                } else if (!data.bet && flag === "true" && !this.props?.collect ) {
                  console.log(data,this.props?.collect);
                  this.audio.lose.play();
                }
              }
            // }
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
          }).then(() => {
            // this.props.handleOptionsSwitch(1);
            // this.props.handleUserDashboard(true);
          });
          break;
        default:
          break;
      }
    };
    if (this.props.gameId) {
      this.client = connectWebSocket(
        "/ws/highlow/" + this.props.gameId + "/",
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
      // this.setState({
      //   creditPurchase: 10
      // });
      this.props.setIsPlayingHiLo(true);
    } else {
      //  this.pollWS()
    }

    //   this.waitSend(JSON.stringify(
    //   {
    //     type: 'bet',
    //     credit_value: this.state.creditPurchase,
    //   }
    // ))
  };

  highLowCollect = () => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const flag = localStorage.getItem("soundEnabled");
      if (this.props.toggleAudio && flag === "true") {
        this.audio.collect.play();
      }
    }

    if (this.client?.readyState === 1) {
    console.log('ISSERVER.',data,this.props.toggleAudio,this.state.bet,);
      this.client.send(
        JSON.stringify({
          type: "collect",
        })
      );
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
              {/*<div className={highLowStyles.value}></div>*/}
              <div className={highLowStyles.rightContainer}>
                <div className={highLowStyles.centeredColumn}>
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
                          className={highLowStyles.fakeButton}
                          style={{
                            backgroundColor: this.state.downFlash
                              ? "#F6D223"
                              : mainColor,
                            color: this.state.downFlash ? "black" : "white",
                          }}
                        >
                          {this.state.bet ? (
                            `Lo - ${lowData || 0}`
                          ) : (
                            <span className={highLowStyles.arrowContent}>
                              LOW
                            </span>
                          )}

                          <div className={highLowStyles.fakeButtonDown}></div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={[
                          highLowStyles.fakeButton,
                          highLowStyles.disabled,
                        ].join(" ")}
                        style={{
                          backgroundColor: this.state.downFlash
                            ? "#F6D223"
                            : mainColor,
                          color: this.state.downFlash ? "black" : "white",
                        }}
                        alt="down button"
                      >
                        {this.state.bet ? (
                          lowData
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

              <div className={highLowStyles.value}>
                {this.isPlaying() ? (
                  this.state.bet && (
                    <>
                      {this.state.bet.credit_value < 100
                        ? Number(this.state.bet.credit_value).toFixed(2)
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
                        this.state.noMoreBets || !this.props.highWinnings
                      }
                      type="radio"
                      name="highlow"
                      value="high"
                      onChange={this.onDirectionChange}
                      checked={this.state.bet.direction === "HIGH"}
                    />

                    <div
                      className={highLowStyles.fakeButton}
                      style={{
                        backgroundColor: this.state.upFlash
                          ? "#F6D223"
                          : mainColor,
                        color: this.state.upFlash ? "black" : "white",
                      }}
                    >
                      {this.state.bet ? (
                        `Hi - ${highData}`
                      ) : (
                        <span className={highLowStyles.arrowContent}>
                          HIGH \{" "}
                        </span>
                      )}
                      <div className={highLowStyles.fakeButtonUp}></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={[
                      highLowStyles.fakeButton,
                      highLowStyles.disabled,
                    ].join(" ")}
                    style={{
                      backgroundColor: this.state.upFlash
                        ? "#F6D223"
                        : mainColor,
                      color: this.state.upFlash ? "black" : "white",
                    }}
                    alt="up button"
                  >
                    {this.state.bet ? (
                      `Hi - ${highData || 0}`
                    ) : (
                      <span className={highLowStyles.arrowContent}>HIGH</span>
                    )}
                    <div className={highLowStyles.fakeButtonUp}></div>
                  </div>
                )}
              </label>
            </div>
          </div>
        ) : (
          <div className={"flex align-center"}>
            <div>
              <div className={[highLowStyles.HighLowLeftContainerTitles]}>
                {/* <CurrentBall
                number={this.props.number}
                angle={this.props.angle}
              /> */}
              </div>
              {/* {this.isPlaying() ? (*/}
              {/*  <Animated*/}
              {/*    animationIn="bounceInRight"*/}
              {/*    animationOut="bounceOutRight"*/}
              {/*  >*/}
              {/*    <button*/}
              {/*      onClick={() => this.highLowCollect()}*/}
              {/*      className={highLowStyles.collectButton}*/}
              {/*    >*/}
              {/*      Collect*/}
              {/*    </button>*/}
              {/*  </Animated>*/}
              {/*) : null} */}
              <div className={highLowStyles.credits}>
                <HiLoPurchaseOld
                  play={this.highLowBet}
                  addCredits={this.addCredits}
                  removeCredits={this.removeCredits}
                  amount={this.state.creditPurchase}
                  openDialog={() => {
                    this.setState({ dialogIsOpen: true });
                  }}
                />
              </div>
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
