import React, { Component } from "react";
import Prize from "./Prize.js";
import prizesStyles from "../../../styles/prizes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

let cycleTimer;

class Prizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      jackpotMessageNum: 0,
      jackpotMessage: null,
      angle: Math.floor(Math.random() * 4) + 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.number !== this.props.number) {
      this.setState({ angle: Math.floor(Math.random() * 4) + 1 });
    }
    if (prevProps.prizes !== this.props.prizes) {
      if (this.props?.prizes?.length) {
        if (
          this.props.prizes[0]?.name === "Bingo" &&
          this.props.numbers_count < 45
        ) {
          this.setState({
            messages: [
              "Jackpot",
              <div key={Math.random()} className={prizesStyles.jackpotValue}>
                <span>{this.props.jackpotCreditValue.toLocaleString()}</span>
                <img
                  alt="yellowcoin"
                  src={"/static/images/yellowCoin.png"}
                  className={prizesStyles.coin}
                />
              </div>,
              <span key={Math.random()}>
                Before {this.props.jackpotWinCount} out
              </span>,
              <span key={Math.random()} title={"Players"}>
                {this.props.player_count} &nbsp;
                <FontAwesomeIcon icon={faUsers} size={"lg"} />
              </span>,
              <span key={Math.random()} title={"Cards"}>
                {this.props.ticket_count} &nbsp;
                <img src={"/static/images/bingo.png"} width={35} height={35} />
              </span>,
            ],
          });
        } else {
          this.setState({
            messages: [
              <span key={Math.random()} title={"Players"}>
                {this.props.player_count} &nbsp;
                <FontAwesomeIcon icon={faUsers} size={"sm"} />
              </span>,
              <span key={Math.random()} title={"Cards"}>
                {this.props.ticket_count} &nbsp;
                <img src={"/static/images/bingo.png"} width={35} height={35} />
              </span>,
            ],
          });
        }
      }
    }
  }

  cycleJackpot() {
    var jackpotMessageNum = this.state.jackpotMessageNum + 1;
    if (jackpotMessageNum >= this.state.messages.length) {
      jackpotMessageNum = 0;
    }
    this.setState({ jackpotMessageNum: jackpotMessageNum });
    this.setState({ jackpotMessage: this.state.messages[jackpotMessageNum] });
    cycleTimer = setTimeout(() => {
      this.cycleJackpot();
    }, 4000);
  }

  componentDidMount() {
    cycleTimer = setTimeout(() => {
      this.cycleJackpot();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(cycleTimer);
  }

  render() {
    if (this.props.prizes) {
      return (
        <div className={prizesStyles.container}>
          <div className={prizesStyles.topContainer}>
            
            {this.props.prizes.length > 0 && (
              <Prize
                jackpotCreditValue={this.props.jackpotCreditValue}
                nextPrizes={this.props.prizes}
                name={this.props.prizes[0].name}
                value={this.props.prizes[0].credit_value}
                masks={this.props.prizes[0].masks}
              />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Prizes;
