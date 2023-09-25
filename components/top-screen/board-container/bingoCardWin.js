import React, { Component } from "react";
import bingoCardStyles from "../../../styles/bingoCard.module.scss";
import DotLoader from "react-spinners/DotLoader";
let cycleTimer;
class BingoCardWin extends Component {
  constructor(props) {
    super(props);
    this.state = { mask_idx: 0, masks: [] };

    this.cycleMask = () => {
      var mask_idx = this.state.mask_idx + 1;
      if (mask_idx > this.state.masks?.length - 1) {
        mask_idx = 0;
      }
      this.setState({ mask_idx: mask_idx });
      cycleTimer = setTimeout(this.cycleMask, 500);
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
            <div className={bingoCardStyles.content}>
              <div className={bingoCardStyles.free}>free</div>
            </div>
          </div>
        );
        return mask;
      });
      this.setState({ masks: masks });
    }

    if (this.props.numbers) {
      var numbers = this.props.numbers;
      numbers.splice(
        12,
        0,
        <div key={Math.random() * 100} className={bingoCardStyles.free}>
          {null}
        </div>
      );
      this.setState({ numbers: numbers });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.masks !== this.props.masks) {
      var masks = this.props.masks.map((mask) => {
        mask.splice(
          12,
          0,
          <div key={Math.random() * 1000} className={bingoCardStyles.square}>
            <div className={bingoCardStyles.content}>
              <div className={bingoCardStyles.free}>free</div>
            </div>
          </div>
        );
        return mask;
      });
      this.setState({ masks: masks });
    }
    if (prevProps.numbers !== this.props.numbers) {
      var numbers = this.props.numbers;
      numbers.splice(
        12,
        0,
        <div key={Math.random() * 1000} className={bingoCardStyles.free}>
          {null}
        </div>
      );
      this.setState({ numbers: numbers });
    }
  }
  componentWillUnmount() {
    clearTimeout(cycleTimer);
  }

  render() {
    var card;
    if (this.state.masks?.length > 0 && this.state.masks[this.state.mask_idx]) {
      card = this.state.masks[this.state.mask_idx].map((mask, index) => {
        if (React.isValidElement(mask)) {
          return mask;
        }
        if (mask) {
          return (
            <div key={Math.random() * 1000} className={bingoCardStyles.square}>
              <div className={bingoCardStyles.content}>
                <div className={bingoCardStyles.stumpTopSectionBingoWinCard}>&nbsp;</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={Math.random() * 1000} className={bingoCardStyles.square}>
              <div className={bingoCardStyles.content}>&nbsp;</div>
            </div>
          );
        }
      });
    } else if (this.state.numbers) {
      card = this.state.numbers.map((number, i) => {
        if (
          this.props.numbersDrawn &&
          this.props.numbersDrawn.includes(number)
        ) {
          return (
            <div key={i} className={bingoCardStyles.square}>
              <div className={bingoCardStyles.content}>
                <div
                  className={[
                    bingoCardStyles.cardStumpTopSection,
                    // number ===
                    // this.props.numbersDrawn[this.props.numbersDrawn.length - 1]
                    //   ? bingoCardStyles.newNum
                    //   : null,
                  ].join(" ")}
                >
                  <span>{number}</span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className={bingoCardStyles.square}>
              <div className={bingoCardStyles.content}>
                  <span className={bingoCardStyles.contentText}>
                    {number}
                  </span>
              </div>
            </div>
          );
        }
      });
    } else {
      card = (
        <span className={bingoCardStyles.loader}>
          <DotLoader />
          <p>Getting Numbers..</p>
        </span>
      );
    }
    var cardStyles = [bingoCardStyles.numbers];
    if (this.state.numbers) {
      cardStyles.push(bingoCardStyles.hasNumbers);
    }
    if (this.props.inCardsGame) {
      cardStyles.push(bingoCardStyles.cardsGameBingoCardsNumbers);
    }
    return (
      <div
        className={` 
        ${bingoCardStyles.bingoCardWin}`}
      >
        {/* <div className={bingoCardStyles.title}>
          <div className={"col1"}>B</div>
          <div className={"col2"}>I</div>
          <div className={"col3"}>N</div>
          <div className={"col4"}>G</div>
          <div className={"col5"}>O</div>
        </div> */}
        <div className={cardStyles.join(" ")}>{card}</div>
      </div>
    );
  }
}

export default BingoCardWin;
