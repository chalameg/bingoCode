import React, { Component } from "react";
import bingoCardStyles from "../../../styles/bingo90/bingoCard.module.scss";
import DotLoader from "react-spinners/DotLoader";
import { Animated } from "react-animated-css";
import { FaHandPointer } from "react-icons/fa";
let cycleTimer, card, cardStyles;

class BingoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mask_idx: 0,
      masks: [],
    };

    this.cycleMask = () => {
      var mask_idx = this.state.mask_idx + 1;
      if (mask_idx > this.state.masks?.length - 1) {
        mask_idx = 0;
      }
      this.setState({ mask_idx: mask_idx });
      setTimeout(this.cycleMask, 500);
    };

    cycleTimer = setTimeout(this.cycleMask, 500);
  }

  componentDidMount() {
    if (this.props.masks) {
      var masks = this.props.masks.map((mask) => {
        mask.splice(
          12,
          0,
          <div key={Math.random() * 100} className={bingoCardStyles.square}>
            <div key={Math.random() * 100} className={bingoCardStyles.content}>
              <div key={Math.random() * 100} className={bingoCardStyles.free}>
                {this.props.freeText}
              </div>
            </div>
          </div>
        );
        return mask;
      });
      this.setState({ masks: masks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.masks !== this.props.masks) {
      var masks = this.props.masks.map((mask) => {
        mask.splice(
          12,
          0,
          <div key={Math.random() * 100} className={bingoCardStyles.square}>
            <div key={Math.random() * 100} className={bingoCardStyles.content}>
              <div key={Math.random() * 100} className={bingoCardStyles.free}>
                {this.props.freeText}
              </div>
            </div>
          </div>
        );
        return mask;
      });

      this.setState({ masks: masks });
    }
  }

  componentWillUnmount() {
    clearTimeout(cycleTimer);
  }

  signNumber = (number, ticketId) => () => {
    const { signedNumbers } = this.props;
    
    const isSigned = this.props.signedNumbers?.some((obj) => obj.number === number && obj.ticketId === ticketId);

    if (!isSigned) {
      const updatedSignedNumbers = [
        ...signedNumbers,
        { number, ticketId }
      ];
      // If the number is not already signed, add it to the signedNumbers array
      this.props.setSignedNumbers(updatedSignedNumbers);
    } 
    // else {
    //   // If the number is already signed, remove it from the signedNumbers array
    //   const updatedSignedNumbers = signedNumbers.filter(
    //     (obj) => !(obj.number === number && obj.ticketId === ticketId)
    //   );

    //   // Notify the parent component to update the prop
    //   this.props.setSignedNumbers(updatedSignedNumbers);
    // }

    // console.log(signedNumbers);
  };  

  render() {
    if (this.state.masks?.length > 0 && this.state.masks[this.state.mask_idx]) {
      card = this.state.masks[this.state.mask_idx].map((mask, index) => {
        if (React.isValidElement(mask)) {
          return mask;
        }
        if (mask) {
          return (
            <div key={Math.random() * 100} className={bingoCardStyles.square}>
              <div
                key={Math.random() * 100}
                className={bingoCardStyles.content}
              >
                <div
                  key={Math.random() * 100}
                  className={bingoCardStyles.stump}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={Math.random() * 100} className={bingoCardStyles.square}>
              <div
                key={Math.random() * 100}
                className={bingoCardStyles.content}
              >
                &nbsp;
              </div>
            </div>
          );
        }
      });
    } else if (this.props.numbers) {
      const numbers = [...this.props.numbers];

      const ticketId = this.props.ticketId;

      const signedNumbersForTicket = this.props.signedNumbers?.filter(
        (obj) => (obj.ticketId === ticketId)
      );

      const forgottenNumbersForTicket = this.props.forgottenNumbers;

      const difference = forgottenNumbersForTicket.length - signedNumbersForTicket?.length;

      // card
      card = numbers.map((number, i) => {
        if (
          this.props.numbersDrawn &&
          this.props.numbersDrawn.includes(number)
        ) {

          // check if number is signed
          const isSigned = this.props.signedNumbers?.some((obj) => obj.number === number && obj.ticketId === ticketId);

          // check if number is forgotten
          const isForgotten = forgottenNumbersForTicket.includes(number);

          let classNames = [bingoCardStyles.cardStump];
          if (isSigned) {
            classNames.push(bingoCardStyles.cardStump);
          } else if (
            number ===
            this.props.numbersDrawn[this.props.numbersDrawn.length - 1]
          ) {
            classNames.push(bingoCardStyles.newNum);
          } else if (
            isForgotten && difference < 4 &&
            number !==
              this.props.numbersDrawn[this.props.numbersDrawn.length - 1]
          ) {
            classNames.push(bingoCardStyles.signForgottenNum);
          }


          return (
            <Animated
              key={i}
              animationInDelay={1 * 10}
              animationIn="bounceInLeft"
              animationOut="BounceOutRight"
            >
              <div key={i} className={bingoCardStyles.square}>
                <div className={bingoCardStyles.content}>
                  <div
                    className={classNames.join(" ")}
                    onClick={this.signNumber(number, ticketId)}
                    style={{ position: "relative" }}
                  >
                    <span>{number}</span>

                    {isForgotten && difference < 4 &&
                      !isSigned &&
                      number !==
                        this.props.numbersDrawn[
                          this.props.numbersDrawn.length - 1
                        ] && (
                        <div className={bingoCardStyles.handPointerContainer}>
                          <FaHandPointer className={this.props.isTicketsStyleNormal ?  bingoCardStyles.normalHandPointer : bingoCardStyles.handPointer}/>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </Animated>
          );
        } else {
          return (
            <Animated
              key={i}
              animationInDelay={1 * 10}
              animationIn="bounceInLeft"
              animationOut="BounceOutRight"
            >
              <div className={bingoCardStyles.square}>
                <div className={bingoCardStyles.content}>
                  <span className={bingoCardStyles.contentText}>{number}</span>
                </div>
              </div>
            </Animated>
          );
        }
      });
    } else {
      card = (
        <span className={bingoCardStyles.loader}>
          <DotLoader />
          &nbsp;
          <p>Getting Numbers..</p>
        </span>
      );
    }
    cardStyles = [
      this.props.isTicketsStyleNormal
        ? bingoCardStyles.numbers
        : bingoCardStyles.numbersSecondStyle,
    ];
    if (this.state.numbers) {
      cardStyles.push(bingoCardStyles.hasNumbers);
    }
    if (this.props.inCardsGame) {
      cardStyles.push(bingoCardStyles.cardsGameBingoCardsNumbers);
    }
    return (
      <div
        className={`${
          this.props.inCardsGame ? bingoCardStyles.cardsGameBingoCard : ""
        } ${bingoCardStyles.bingoCard}`}
      >
        <div className={cardStyles.join(" ")}>{card}</div>
      </div>
    );
  }
}

export default BingoCard;
