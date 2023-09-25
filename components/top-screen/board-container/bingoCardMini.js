import React, { Component } from "react";
import bingoCardStyles from "../../../styles/bingoCard.module.scss";

let cycleTimer;

class BingoCardMini extends Component {
  cycleTimer;
  state = { mask_idx: 0, masks: [] };

  constructor(props) {
    super(props);
    this.cycleTimer = setInterval(this.cycleMask, 500);
  }

  cycleMask = () => {
    let mask_idx = this.state.mask_idx + 1;
    if (mask_idx > this.state.masks?.length - 1) {
      mask_idx = 0;
    }
    this.setState({ mask_idx });
  };

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

  componentWillUnmount() {
    clearInterval(cycleTimer);
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

    if (prevProps.numbers !== this.props.numbers) {
      var numbers = this.props.numbers;
        numbers.splice(12, 0,
          <div key={Math.random()*100}  className={bingoCardStyles.free}>
          {null}
          </div>
        );
      this.setState({numbers: numbers});
    }
  }

  render() {
    var card;
    if (
      this.state.masks?.length > 0 &&
      this.state.masks[0]?.length === 25 &&
      this.state.masks[this.state.mask_idx]
    ) {
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
    }
    // else  if (this.state.numbers) {
    //    card = this.state.numbers.map((number,i ) => {
    //     if (this.props.numbersDrawn && this.props.numbersDrawn.includes(number)) {
    //       return (
    //         <Animated key={i} animationInDelay={i*10} animationIn="bounceInLeft" animationOut="BounceOutRight">
    //         <div key={i} className={bingoCardStyles.square}>
    //           <div className={bingoCardStyles.content}>
    //             <div className={bingoCardStyles.stump}>{number}</div>
    //           </div>
    //         </div>
    //         </Animated>
    //       );
    //     } else {
    //       return (
    //         <Animated key={i} animationInDelay={i*10}  animationIn="bounceInLeft" animationOut="BounceOutRight">
    //         <div className={bingoCardStyles.square}>
    //           <div className={bingoCardStyles.content}>
    //             { number }
    //           </div>
    //         </div>
    //         </Animated>
    //       );
    //     }
    //   })
    // } else {
    //    card = <span className={bingoCardStyles.loader}>
    //      <DotLoader/>
    //    <p>Getting Numbers..</p>
    //    </span>;
    //  }
    var cardStyles = [bingoCardStyles.numbers];
    if (this.state.numbers) {
      cardStyles.push(bingoCardStyles.hasNumbers);
    }
    return (
      <div className={bingoCardStyles.bingoCardMini}>
        {/* <div className={bingoCardStyles.title}>
          <div className={'col1'}>B</div>
          <div className={'col2'}>I</div>
          <div className={'col3'}>N</div>
          <div className={'col4'}>G</div>
          <div className={'col5'}>O</div>
        </div> */}
        <div className={cardStyles.join(" ")}>{card}</div>
      </div>
    );
  }
}

export default BingoCardMini;
