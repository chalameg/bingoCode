import React, {Component} from "react";
import buyTicketsStyles from "../../styles/buyTickets.module.css";
import formControlStyles from "../../styles/formControl.module.css";
//import glowingStyles from './glowing.module.css';
import swal from "sweetalert2";
import globalStyles from "../../styles/global.module.css";
import Slide from "react-reveal/Slide";
import HandClick from "./HandClick/HandClick";
import connectWebSocket90 from "../../../config/socket90";

class BuyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCost: 0,
      ticketCost: 0,
      loading: false,
      showSelectBtns: false,
      doFlash: false,
    };
    this.audio = {
      add: typeof Audio !== "undefined" ? new Audio("/sounds/buttons/add.mp3") : undefined,
      subtract: typeof Audio !== "undefined" ? new Audio("/sounds/buttons/subtract.mp3") : undefined,
      buy: typeof Audio !== "undefined" ? new Audio("/sounds/buttons/playBuyButton.mp3") : undefined,
    };
  }

  componentDidMount() {
    var onmessage = (message) => {
      data = JSON.parse(message?.data);
      if (data?.tickets) {
        this.setState({
          ownedTicketCount: data.tickets?.length,
        });
        this.setState({ticketCost: data.ticket_cost});
        this.setState({
          totalCost: this.props.ticketCount * this.state.ticketCost,
        });
      }

      if (data?.type === "warning") {
        swal({
          title: "Insufficient Credits!",
          icon: "warning",
        }).then(() => {
          this.setState({loading: false});
          this.props.handleOptionsSwitch(1);
          this.props.handleUserDashboard(true);
        });
      }
    };
    this.client = connectWebSocket90(
      "/ws/90/tickets/90/",
      onmessage,
      this.props.setReconnecting
    );
  }

  componentWillUnmount() {
    this.client.close();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ticketCount !== this.props.ticketCount) {
      this.setState({
        totalCost: this.props.ticketCount * this.state.ticketCost,
      });
    }
    if (
      prevState.ownedTicketCount !== this.state.ownedTicketCount ||
      prevState.tickets !== this.state.tickets
    ) {
      this.setState({loading: false});
      this.setState({showSelectBtns: false});
      this.setState({doFlash: true});
      setTimeout(() => {
        this.setState({doFlash: false});
      }, 1000);
    }
  }

  buyTickets() {
    if (this.client?.readyState === 1) {
      const flag = localStorage.getItem("soundEnabled");
      if (this.props.toggleAudio && flag) {
        this.audio.buy.play();
      }
      this.props.buyTickets(this.props.ticketCount);
      this.setState({loading: true});
    }
  }

  setTicket(value) {
    this.setState({ticketCount: value});
  }


  render() {
    return (
      <div className={buyTicketsStyles.container}>
        {!this.props.tickets.length ? (
          <div className={buyTicketsStyles.wrapper}>
            {/*             <div className={buyTicketsStyles.clock}>
                <div className={buyTicketsStyles.clockCircles}>
                  <div className={buyTicketsStyles.clockCirclesItem}></div>
                  <div className={buyTicketsStyles.clockCirclesItem}></div>
                  <div className={buyTicketsStyles.clockCirclesItem}></div>
                  <div className={buyTicketsStyles.clockCirclesItem}>
                    <div className={buyTicketsStyles.wave}></div>
                    <div className={buyTicketsStyles.wave}></div>
                    <div className={buyTicketsStyles.wave}></div>
                    <div className={buyTicketsStyles.wave}></div>
                    <div className={buyTicketsStyles.wave}></div>
                  </div>
                </div>
                <div className={buyTicketsStyles.clockTimes}>
                  <div className={buyTicketsStyles.clockTimesSecond}></div>
                  <div className={buyTicketsStyles.clockTimesMinute}></div>
                  <div className={buyTicketsStyles.clockTimesHour}></div>
                </div>
              </div>*/}
            <div className="clock">
              <div className="top"></div>
              <div className="right"></div>
              <div className="bottom"></div>
              <div className="left"></div>
              <div className="center"></div>
              <div className="shadow"></div>
              <div className="hour"></div>
              <div className="minute"></div>
              <div className="second"></div>
            </div>

          </div>
        ) : null}


        <div className={buyTicketsStyles.minutsDiv}>
          {
            !this.props.tickets.length && (
              <p style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{margin: "0 15px"}}>
                  {Math.floor((75 - this.props.numbers_drawn) / 18)}
                </h1>
                <h2
                  className={[
                    this.props.numbers_drawn > 60 ? globalStyles.blinkerText : null,
                    buyTicketsStyles.toNextGame,
                  ].join(" ")}
                >
                  MINUTES TO
                </h2>
              </p>
            )
          }


          <div className={buyTicketsStyles.ticketCount}>
            <span>NEXT GAME</span>
            <div className={buyTicketsStyles.ticketCount2}>
            <span
              className={[
                buyTicketsStyles.number,
                this.state.doFlash ? buyTicketsStyles.newTicketsNum : null,
              ].join(" ")}
            >
              {this.state.ownedTicketCount}
            </span>
              &nbsp;Cards
            </div>
          </div>
          {/*<button class="button-72" role="button">Button 72</button>*/}
          <div>
            <button
              className={buyTicketsStyles.buttonI} role="button"
              // className={buyTicketsStyles.buyButton}
              onClick={() => this.buyTickets()}
              disabled={this.state.loading}
            >
              {/* <div className={buyTicketsStyles.ticketsCost}>
              <div>Cost:&nbsp;</div>
              <div>
                <img
                  className={buyTicketsStyles.coin}
                  src={yellowCoin}
                  alt="coin icon"
                />
              </div>
              <div>{this.state.totalCost}</div>
            </div> */}


              {!this.state.loading ? (
                <div className={"s"} style={{position: 'relative'}}>
                  <div className={buyTicketsStyles.buyTitle}>Get Cards</div>
                  {
                    this.state.ownedTicketCount === 0 && !this.props.tickets.length && (
                      <HandClick/>
                    )
                  }
                </div>
              ) : (
                <span className={buyTicketsStyles.spinner}>&nbsp;</span>
              )}
            </button>
          </div>

          <div style={{display: 'flex'}}>
            <Slide top collapse when={this.state.showSelectBtns}>
              <div
                className={formControlStyles.circleButton}
                onClick={() => this.props.handleTicketCount(12)}
              >
                12
              </div>
              <div
                className={formControlStyles.circleButton}
                onClick={() => this.props.handleTicketCount(24)}
              >
                24
              </div>
              <div
                className={formControlStyles.circleButton}
                onClick={() => this.props.handleTicketCount(48)}
              >
                48
              </div>
            </Slide>
          </div>

          <div className={formControlStyles.container}>
            <div
              className={formControlStyles.valueChangeButton}
              onClick={() => {
                this.props.handleTicketCount(this.props.ticketCount - 1);
                this.setState({showSelectBtns: true});
                const flag = localStorage.getItem("soundEnabled");
                if (this.props.toggleAudio && flag) {
                  this.audio.subtract.play();
                }
              }}
            >
              -
            </div>
            <div className={buyTicketsStyles.ticketQuantity}>
              {this.props.ticketCount}
            </div>
            <div
              className={formControlStyles.valueChangeButton}
              onClick={() => {
                this.props.handleTicketCount(this.props.ticketCount + 1);
                this.setState({showSelectBtns: true});
                const flag = localStorage.getItem("soundEnabled");
                if (this.props.toggleAudio && flag) {
                  this.audio.add.play();
                }
              }}
            >
              +
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default BuyTickets;
