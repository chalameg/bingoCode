import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import swal from "sweetalert2";

import connectWebSocket90 from "../../../config/socket90";
import { Bingo90Context } from "../../../common/context";
import style from "../../../styles/bingo90/luckyNumbers.module.scss";
import chip14 from "../../../public/static/images/bingo90/chips-1-4.png";
import chip59 from "../../../public/static/images/bingo90/chips-5-9.png";
import chip1049 from "../../../public/static/images/bingo90/chips-10-49.png";
import chip5099 from "../../../public/static/images/bingo90/chips-50-99.png";
import chip100 from "../../../public/static/images/bingo90/chips-100+.png";
import { useMediaQuery } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { AiOutlineDrag } from "react-icons/ai";

const LuckyNumbersBet = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));
  const [bettingData, setBettingData] = useState([]);

  const [previousActionData, setPreviousActionData] = useState([]);
  const [copyFromLastBetCount, setCopyFromLastBetCount] = useState(0);
  const dataRef = useRef([]);

  const {
    messageData,
    setLuckyNumbers,
    setPlayerBalance,
    clickedIndexies,
    setClickedIndexies,
    totalBet,
    setTotalBet,
    playerBalance,
    luckyBetOpen,
    setLuckyBetOpen,
    chipsAmount,
    setChipsAmount,
    luckySent,
    setLuckySent,
  } = useContext(Bingo90Context);

  const range = (start, end) => {
    return Array.apply(0, Array(end)).map((element, index) => index + start);
  };

  const numbersForLuckyNumberSelection = range(1, 90);

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);
    setLuckyNumbers(jsonData?.lucky_numbers);
  };

  const sendLucky = (client, data) => {
    client?.send(
      JSON.stringify({
        type: "buy_lucky_numbers",
        bingo_size: 90,
        numbers: data,
      })
    );

    console.log("sent >>>>>>>>>>>>>>>>>>>>>>>> ", data);

    setPreviousActionData([]);

    setBettingData([]);

    setClickedIndexies({});

    setTotalBet(0);

    setLuckySent(true);

    setTimeout(() => {
      setLuckySent(false);
    }, 3000);
  };

  useEffect(() => {
    if (messageData?.duration) {
      setTimeout(() => {
        const client = connectWebSocket90(
          "/ws/90/lucky_numbers/90/",
          (message) => {
            onGameMessageReceived(message);
          }
        );

        client.onopen = () => {
          sendLucky(client, dataRef.current);
        };
      }, 9 * 1000);
    }
  }, [messageData?.duration]);

  const betWithNumber = (number, index) => () => {
    if (luckySent) {
      return;
    }

    const balance = parseInt(playerBalance.toLocaleString().replace(/\D/g, ""));

    if (chipsAmount > balance) {
      new swal({
        icon: "error",
        title: "You don't have enough money to bet.",
        button: "Ok",
      });
      return;
    }

    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers((state) => [...state, number]);
    }

    setClickedIndexies((state) => ({
      ...state,
      [index]: state[index] == null ? chipsAmount : state[index] + chipsAmount,
    }));

    setTotalBet((state) => state + chipsAmount);

    setPreviousActionData((state) => [
      ...state,
      { addedBet: { [index]: chipsAmount } },
    ]);

    updatePlayerBalance("substract", chipsAmount);
  };

  useEffect(() => {
    let data = [];
    Object.entries(clickedIndexies).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === NaN ||
        value === 0
      ) {
        delete clickedIndexies[key];
      }
      if (value != null || value != undefined || value != NaN || value != 0)
        data.push({ number: +key + 1, cost: value });
    });

    setBettingData(data);

    dataRef.current = data;
  }, [clickedIndexies]);

  const updatePlayerBalance = (action, data) => {
    if (action === "substract") {
      setPlayerBalance((state) =>
        parseInt(
          parseInt(state.toLocaleString().replace(/\D/g, "")) - data,
          10
        ).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      );
    } else {
      setPlayerBalance((state) =>
        parseInt(
          parseInt(state.toLocaleString().replace(/\D/g, "")) + data,
          10
        ).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      );
    }
  };

  const undoActions = () => {
    if (luckySent) {
      return;
    }
    if (previousActionData.length > 0) {
      const lastAction = previousActionData[previousActionData.length - 1];

      if (lastAction?.addedBet) {
        const indexOfLast = Object.keys(lastAction?.addedBet)[0];
        const valueOfLast = Object.values(lastAction?.addedBet)[0];

        //remove value of last from clickedIndexies,
        setClickedIndexies((state) => ({
          ...state,
          [indexOfLast]:
            state[indexOfLast] - valueOfLast === 0
              ? null
              : state[indexOfLast] - valueOfLast,
        }));

        //update totalBet by value of last action
        setTotalBet((state) => state - valueOfLast);

        updatePlayerBalance("add", valueOfLast);
      } else if (lastAction?.removedBets) {
        const betsCost = lastAction?.betsCost;

        setClickedIndexies(lastAction?.removedBets);

        setTotalBet(betsCost);

        updatePlayerBalance("substract", betsCost);
      } else if (lastAction?.doubledBet) {
        const clickedIndexiesCopy = { ...clickedIndexies };

        for (let item of Object.keys(clickedIndexiesCopy)) {
          clickedIndexiesCopy[item] =
            clickedIndexiesCopy[item] === null
              ? null
              : clickedIndexiesCopy[item] / 2;
        }

        setClickedIndexies(clickedIndexiesCopy);

        setTotalBet((state) => state - lastAction?.betsCost);

        updatePlayerBalance("add", lastAction?.betsCost);
      } else {
        setCopyFromLastBetCount(0);

        const data = lastAction?.copiedFromLastBet;

        const clickedIndexiesCopy = { ...clickedIndexies };

        Object.entries(data).forEach(([key, value]) => {
          if (Object.keys(clickedIndexiesCopy).includes(key)) {
            clickedIndexiesCopy[key] =
              clickedIndexiesCopy[key] - value > 0
                ? clickedIndexiesCopy[key] - value
                : null;
          }
        });

        setClickedIndexies(clickedIndexiesCopy);

        setTotalBet((state) => state - lastAction?.betsCost);
        updatePlayerBalance("add", lastAction?.betsCost);
      }
      previousActionData.pop();
    }
  };

  const copyFromLastBet = () => {
    if (luckySent) {
      return;
    }
    if (messageData?.lucky_numbers.length > 0 && copyFromLastBetCount === 0) {
      setCopyFromLastBetCount((state) => state + 1);

      setBettingData([]);

      const betsCost = 0;
      const data = {};

      for (let index = 0; index < messageData?.lucky_numbers.length; index++) {
        const element = messageData?.lucky_numbers[index];

        data[element.number - 1] = element.cost;

        betsCost += element.cost;
      }

      const clickedIndexiesCopy = { ...clickedIndexies };

      Object.entries(data).forEach(([key, value]) => {
        if (key === betsCost) {
          return;
        }

        if (Object.keys(clickedIndexiesCopy).includes(key)) {
          clickedIndexiesCopy[key] += value;
        } else {
          clickedIndexiesCopy[key] = value;
        }
      });

      setClickedIndexies(clickedIndexiesCopy);

      setPreviousActionData((state) => [
        ...state,
        { copiedFromLastBet: data, betsCost: betsCost },
      ]);

      //handle playerbalance and totalBet
      setTotalBet((state) => state + betsCost);

      updatePlayerBalance("substract", betsCost);
    }
  };

  const removeSelections = () => {
    if (luckySent) {
      return;
    }
    if (bettingData.length > 0) {
      const betsCost = 0;

      const clickedIndexiesCopy = { ...clickedIndexies };

      for (let item of Object.keys(clickedIndexiesCopy)) {
        betsCost += clickedIndexiesCopy[item];
      }

      setPreviousActionData((state) => [
        ...state,
        { removedBets: clickedIndexies, betsCost },
      ]);

      updatePlayerBalance("add", betsCost);

      setClickedIndexies({});

      setBettingData([]);

      setTotalBet(0);

      //reset doubleBet if doubledBet action is taken previously
      for (let i = 0; i < previousActionData.length; i++) {
        // console.log("actions " ,previousActionData[i]);

        if (Object.keys(previousActionData[i]).includes("copiedFromLastBet")) {
          setCopyFromLastBetCount(0);
        }
      }
    }
  };

  const doubleBet = () => {
    if (luckySent) {
      return;
    }
    if (bettingData.length > 0) {
      const betsCost = 0;

      const clickedIndexiesCopy = { ...clickedIndexies };

      for (let item of Object.keys(clickedIndexiesCopy)) {
        betsCost += clickedIndexiesCopy[item];

        clickedIndexiesCopy[item] =
          clickedIndexiesCopy[item] === null
            ? null
            : clickedIndexiesCopy[item] * 2;
      }

      setClickedIndexies(clickedIndexiesCopy);

      setPreviousActionData((state) => [
        ...state,
        { doubledBet: 1, betsCost: betsCost },
      ]);

      //handle playerbalance and totalBet
      setTotalBet((state) => state + betsCost);

      updatePlayerBalance("substract", betsCost);
    }
  };

  const addChips = () => {
    if (luckySent) {
      return;
    }
    if (chipsAmount < 100) {
      chipsAmount == 5 || chipsAmount == 50
        ? setChipsAmount(chipsAmount * 2)
        : setChipsAmount(chipsAmount * 5);
    }
  };

  const substractChips = () => {
    if (luckySent) {
      return;
    }
    if (chipsAmount > 1) {
      chipsAmount == 100 || chipsAmount == 10
        ? setChipsAmount(chipsAmount / 2)
        : setChipsAmount(chipsAmount / 5);
    }
  };

  const openCloseBet = () => {
    setLuckyBetOpen(!luckyBetOpen);
  };

  return (
    <div style={{zIndex:"1002"}}>
        <div
          className={`flex flex-column ${style.luckyBetContainer}`}>
          <div className={`${style.titleText}`}>
            <div className={style.totalBet}>
              <h6>
                Total bet <span>: {totalBet}</span>
              </h6>

              <img
                src="/static/images/yellowCoin.png"
                alt="coin"
              />
            </div>

            <div>NEXT</div>

            <div className="flex items-center justify-center gap-3">
              <AiOutlineDrag className={`drag-handle ${style.dragIcon}`}/>

              <span onClick={openCloseBet} >
                  <img
                    className={style.closeBetIcon}
                    src="/static/images/bingo90/closeIcon.svg"
                    alt="close"
                  />
              </span>
            </div>
          </div>

          <div className={`${style.tickets}`}>
            {numbersForLuckyNumberSelection.map((number, index) => {
              return (
                <div
                  key={number}
                  className={style.betLuckyNumber}
                  style={{
                    backgroundColor: clickedIndexies[index]
                      ? "rgba(212, 225, 255, 0.7)"
                      : "rgba(212, 225, 231, 0.6)",
                  }}
                  onClick={betWithNumber(number, index)}
                >
                  {clickedIndexies[index] && (
                    <div className={style.betContainer}>
                      <div
                        className={style.desktopBetBottom}
                        style={{
                          backgroundImage:
                            clickedIndexies[index] && clickedIndexies[index] < 5
                              ? `url(${chip14.src})`
                              : clickedIndexies[index] >= 5 &&
                                clickedIndexies[index] < 10
                              ? `url(${chip59.src})`
                              : clickedIndexies[index] >= 10 &&
                                clickedIndexies[index] < 49
                              ? `url(${chip1049.src})`
                              : clickedIndexies[index] >= 50 &&
                                clickedIndexies[index] < 100
                              ? `url(${chip5099.src})`
                              : clickedIndexies[index] >= 100
                              ? `url(${chip100.src})`
                              : "",
                        }}
                      >
                        <>
                          <span
                            style={{
                              color:
                                clickedIndexies[index] < 5
                                  ? "#000000"
                                  : clickedIndexies[index] >= 5 &&
                                    clickedIndexies[index] < 10
                                  ? "#4244E4"
                                  : clickedIndexies[index] >= 10 &&
                                    clickedIndexies[index] < 49
                                  ? "#de4343"
                                  : clickedIndexies[index] >= 50 &&
                                    clickedIndexies[index] < 100
                                  ? "#40b02f"
                                  : "#FE7F37",

                              fontSize:
                                clickedIndexies[index] < 100 && isMobile
                                  ? "13px"
                                  : clickedIndexies[index] > 100 && isMobile
                                  ? "10px"
                                  : clickedIndexies[index] > 100 && !isMobile
                                  ? "12px"
                                  : "15px",
                            }}
                          >
                            {clickedIndexies[index]}
                          </span>
                        </>
                      </div>
                      <div className={style.betTop}>{number}</div>
                    </div>
                  )}

                  {!clickedIndexies[index] && number}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${style.buttons}`}>
          <button
            className={`${style.button}  ${style.btnSub}`}
            onClick={substractChips}
          ></button>
          <div className={style.currentChip}>
            <Image
              src={`/static/images/bingo90/chips-${chipsAmount}.png`}
              layout="fill"
              alt="chip"
            />
          </div>

          <button
            className={`${style.button} ${style.btnAdd}`}
            onClick={addChips}
          ></button>
          <div className={`${style.btnGroup}`}>
            <button
              className={`${style.button}  ${style.btnUndo}`}
              onClick={undoActions}
            ></button>
            <button
              className={`${style.button} ${style.btnRemove}`}
              onClick={removeSelections}
            ></button>
            <button
              className={`${style.button}  ${style.btnDouble}`}
              onClick={doubleBet}
            ></button>
            <button
              className={`${style.button}  ${style.btnCopy}`}
              onClick={copyFromLastBet}
            ></button>
          </div>
        </div>
     

      {luckySent && <div className={`${style.noMoreBets}`}>No More Bets</div>}
    </div>
  );
};

export default LuckyNumbersBet;
