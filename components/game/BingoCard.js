import React, {Component} from "react";
import bingoCardStyles from "../../styles/bingoCard.module.scss";
import DotLoader from "react-spinners/DotLoader";
import {Animated} from "react-animated-css";
import {useEffect} from "react";
let cycleTimer, card, cardStyles;

class BingoCard extends Component {
  constructor(props) {
    super(props);
    this.state = { mask_idx: 0, masks: [] };
    
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

   
    // if (prevProps.numbers.sort().toString() !== this.props.numbers.sort().toString() ){
    //   // var numbers = this.props.numbers;
    //   const numbers = [...this.props.numbers]
    //   numbers.splice(
    //     12,
    //     0,
    //     <div key={Math.random() * 100} className={bingoCardStyles.free}>
    //       {this.props.freeText}
    //     </div>
    //   );
    //   this.setState({ numbers: numbers });
    //   this.setState({ loading: true });

    // }

  }

  componentWillUnmount() {
    clearTimeout(cycleTimer);
  }

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
    } else if (this.props.numbers ) {
      const numbers = [...this.props.numbers]; 
      numbers.splice(
        12,
        0,
        <div key={Math.random() * 100} className={bingoCardStyles.free}>
          {this.props.freeText}
        </div>
      );
      card = numbers.map((number, i) => {
        if (
          this.props.numbersDrawn &&
          this.props.numbersDrawn.includes(number)
        ) {
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
                    className={[
                      bingoCardStyles.cardStump,
                      number ===
                      this.props.numbersDrawn[
                        this.props.numbersDrawn.length - 1
                      ]
                      
                      // && !this.props.inGame  
                      // && number !==
                      // this.props.winners[0]?.ticket_numbers[
                      //   this.props.winners[0]?.ticket_numbers?.length - 1
                      // ]
                        ? bingoCardStyles.newNum
                        : null,
                    ].join(" ")}
                  >
                    <span>{number}</span>
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
    cardStyles = [bingoCardStyles.numbers];
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
        <div className={bingoCardStyles.title}>
          <div className={"col1"}>
            B
            {/* {this.props.number < 16 && (
              <CurrentBall
                floating={true}
                number={this.props.number}
                angle={4}
              />
            )} */}
          </div>
          <div className={"col2"}>
            I
            {/* {this.props.number < 31 && this.props.number > 15 && (
              <CurrentBall
                floating={true}
                number={this.props.number}
                angle={4}
              />
            )} */}
          </div>
          <div className={"col3"}>
            N
            {/* {this.props.number < 46 && this.props.number > 30 && (
              <CurrentBall
                floating={true}
                number={this.props.number}
                angle={4}
              />
            )} */}
          </div>
          <div className={"col4"}>
            G
            {/* {this.props.number < 61 && this.props.number > 45 && (
              <CurrentBall
                floating={true}
                number={this.props.number}
                angle={4}
              />
            )} */}
          </div>
          <div className={"col5"}>
            O
            {/* {this.props.number > 60 && (
              <CurrentBall
                floating={true}
                number={this.props.number}
                angle={4}
              />
            )} */}
          </div>
        </div>
        <div className={cardStyles.join(" ")}>{card}</div>
      </div>
    );
  }
}

export default BingoCard;
