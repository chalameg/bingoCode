import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Bingo90Context } from "../../../common/context";
import style from "../../../styles/bingo90/luckyNumbers.module.scss";
import indexStyle from "../../../styles/bingo90/index.module.scss";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import chip14 from "../../../public/static/images/bingo90/chips-1-4.png";
import chip59 from "../../../public/static/images/bingo90/chips-5-9.png";
import chip1049 from "../../../public/static/images/bingo90/chips-10-49.png";
import chip5099 from "../../../public/static/images/bingo90/chips-50-99.png";
import chip100 from "../../../public/static/images/bingo90/chips-100+.png";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "../../common/button/Button";

const LuckyNumbersInfo = ({
  numbersForLuckyNumberSelection,
  one_number_tickets,
  playNowHandler,
  tapToHideHandler,
}) => {
  const {
    messageData,
    jackpotPrize,
    bingoPrize,
    twoLinePrize,
    linePrize,
    isWinningNow,
  } = useContext(Bingo90Context);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [prizesLength, setPrizesLength] = useState(null);
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [wonNumbers, setWonNumbers] = useState([]);

  const [oneNumberTickets, setOneNumberTickets] = useState(one_number_tickets);

  const oneNumbersRef = useRef([]);
  const lastNumbersDrawn = useRef(null);

  //delay tickets with one number after winning
  useEffect(() => {
    oneNumbersRef.current = one_number_tickets;

    if (isWinningNow) {
      setOneNumberTickets([]);
      lastNumbersDrawn.current =
        messageData?.numbersDrawn[messageData?.numbersDrawn?.length - 1];
    } else if (
      lastNumbersDrawn.current !==
      messageData?.numbersDrawn[messageData?.numbersDrawn?.length - 1]
    ) {
      setOneNumberTickets(oneNumbersRef.current);
    }
  }, [isWinningNow, one_number_tickets]);

  const getNumber = (number) => {
    if (messageData?.numbersDrawn?.includes(number)) {
      if (
        number ===
        messageData?.numbersDrawn[messageData?.numbersDrawn?.length - 1]
      ) {
        return number;
      } else if (
        (linePrize && number === linePrize[0]) ||
        (twoLinePrize && number === twoLinePrize[0]) ||
        (bingoPrize && number === bingoPrize[0]) ||
        (jackpotPrize && number === jackpotPrize[0])
      ) {
        return number;
      } else {
        return "";
      }
    } else {
      return number;
    }
  };

  useEffect(() => {
    const gamePrizes = messageData?.game?.game_prizes;

    const gamePrizesValue = gamePrizes.map((e) => {
      return Object.values(e)[0];
    });

    setTimeout(() => {
      setWonNumbers(gamePrizesValue);

      let uniquePrizes = {};

      for (let i = 0; i < gamePrizes?.length; i++) {
        let gamePrizeKey = Object.keys(gamePrizes[i])[0];
        let gamePrizeValue = Object.values(gamePrizes[i]);

        if (!Object.keys(uniquePrizes).includes(gamePrizeKey)) {
          uniquePrizes[gamePrizeKey] = gamePrizeValue;
        }
      }

      const prizesLength = Object.keys(uniquePrizes).length;

      setPrizesLength(prizesLength);
    }, 1500);
  }, [messageData?.game?.game_prizes]);

  
  useEffect(() => {
    console.log(messageData?.lucky_numbers)
    setLuckyNumbers(messageData?.lucky_numbers);
  }, []);

  const ln = [
    {number: 10, cost: 5},
    {number: 23, cost: 5},
    {number: 31, cost: 1}
  ]
  const getCostAtIndex = (number) => {
    const lucky = luckyNumbers.find((e) => e.number === number);
    if (!lucky) {
      return null;
    }
    return lucky.cost;
  };

  return (
    <div className="flex flex-column">
      <div className={`${style.luckyInfoContainer}`}>
        <div className={`${style.luckyInfoButtons}`}>
          <button
            className={`${style.button}   ${style.btnInfo}`}
            onClick={() => setDialogIsOpen(true)}
            style={{margin:"-4px 0 0 0"}}
          ></button>

          <Button
            onClick={playNowHandler}
            className={`${indexStyle.bingo90Button}`}
            buttonText={
              <span
                className="flex items-center"
                style={{ margin: "0 10px  0 8px" }}
              >
                Play Now
                <span
                  className={style.luckyInButton}
                  style={{
                    background: "rgba(255, 255, 255, 0.68)",
                    marginLeft: "10px",
                  }}
                >
                  55
                </span>
                <span
                  className={style.luckyInButton}
                  style={{ background: "#4FE439", marginLeft: "3px" }}
                >
                  56
                </span>
                <span
                  className={style.luckyInButton}
                  style={{
                    background: "rgba(255, 255, 255, 0.68)",
                    marginLeft: "3px",
                  }}
                >
                  57
                </span>
                <div style={{ position: "relative" }}>
                  <img
                    src="/static/images/bingo90/chips-10.svg"
                    style={{
                      height: "36px",
                      width: "36px",
                      position: "absolute",
                      top: "-22px",
                      left: "-18px",
                    }}
                  />
                </div>
              </span>
            }
          />

          <div onClick={tapToHideHandler} style={{marginTop:"-5px"}}>
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="28.25%" stop-color="#fe7f37" />
                <stop offset="79.56%" stop-color="#ff4b4b" />
              </linearGradient>
            </svg>

            <IoMdClose
              style={{
                height: "35px",
                width: "35px",
                fill: "url(#gradient)",
              }}
            />
          </div>
        </div>

        <div className={`${style.tickets}`}>
          {numbersForLuckyNumberSelection.map((number) => {
            return (
              <div
                key={number}
                className={
                  style.betLuckyNumber
                }
                style={{
                  height: "100%",
                  background:
                    wonNumbers?.includes(number) &&
                    isWinningNow &&
                    prizesLength === 1 &&
                    number ===
                      messageData?.numbersDrawn[
                        messageData?.numbersDrawn?.length - 1
                      ]
                      ? "#4FE439"
                      : wonNumbers?.includes(number) &&
                        isWinningNow &&
                        prizesLength === 2 &&
                        number ===
                          messageData?.numbersDrawn[
                            messageData?.numbersDrawn?.length - 1
                          ]
                      ? "#FCE058"
                      : wonNumbers?.includes(number) &&
                        isWinningNow &&
                        prizesLength === 3 &&
                        number ===
                          messageData?.numbersDrawn[
                            messageData?.numbersDrawn?.length - 1
                          ]
                      ? "#FF4B4B"
                      : wonNumbers?.includes(number) &&
                        isWinningNow &&
                        prizesLength === 4 &&
                        number ===
                          messageData?.numbersDrawn[
                            messageData?.numbersDrawn?.length - 1
                          ]
                      ? "linear-gradient(119.36deg, #FE7F37 28.25%, #FF4A11 79.56%)"
                      : oneNumberTickets.includes(number) &&
                        prizesLength === 0 &&
                        !isWinningNow
                      ? "#4FE439"
                      : oneNumberTickets.includes(number) &&
                        prizesLength === 1 &&
                        !isWinningNow
                      ? "#FCE058"
                      : oneNumberTickets.includes(number) &&
                        prizesLength === 2 &&
                        !isWinningNow
                      ? "#FF4B4B"
                      : oneNumberTickets.includes(number) &&
                        prizesLength === 3 &&
                        !isWinningNow
                      ? "linear-gradient(119.36deg, #FE7F37 28.25%, #FF4A11 79.56%)"
                      : !wonNumbers?.includes(number) &&
                        number ===
                          messageData?.numbersDrawn[
                            messageData?.numbersDrawn?.length - 1
                          ]
                      ? "white"
                      : bingoPrize && number === bingoPrize[0]
                      ? "rgba(255, 75, 75, 0.5)"
                      : linePrize && number === linePrize[0]
                      ? "rgba(79, 228, 57, 0.5)"
                      : twoLinePrize && number === twoLinePrize[0]
                      ? "rgba(252, 224, 88, 0.5)"
                      : jackpotPrize && number === jackpotPrize[0]
                      ? "linear-gradient(119.36deg, rgba(254, 127, 55, 0.5) 28.25%, rgba(255, 74, 17, 0.5) 79.56%)"
                      : messageData?.numbersDrawn?.includes(number)
                      ? "transparent"
                      : "rgba(212, 225, 231, 0.6)",
                }}
              >
                {
                  <span
                    className={`${
                      getNumber(number) && getCostAtIndex(number)
                        ? style.luckyNumberValue
                        : ""
                    }`}
                    style={{
                      marginLeft:
                        getNumber(number) && getCostAtIndex(number)
                          ? "15px"
                          : 0,
                    }}
                  >
                    {getNumber(number)}
                  </span>
                }
                {getNumber(number) && getCostAtIndex(number) && (
                  <div
                    className={
                      style.luckyInfoChipContainer
                    }
                  >
                    <img
                      src={
                        getCostAtIndex(number) < 5
                          ? chip14.src
                          : getCostAtIndex(number) >= 5 &&
                            getCostAtIndex(number) < 10
                          ? chip59.src
                          : getCostAtIndex(number) >= 10 &&
                            getCostAtIndex(number) < 50
                          ? chip1049.src
                          : getCostAtIndex(number) >= 50 &&
                            getCostAtIndex(number) < 100
                          ? chip5099.src
                          : getCostAtIndex(number) >= 100
                          ? chip100.src
                          : ""
                      }
                      alt="chips"
                    />

                    <span
                      className={
                        style.luckyInfoCostContainer
                      }
                      style={{
                        fontSize: getCostAtIndex(number) < 100 ? "10px" : "8px",
                        color:
                          getCostAtIndex(number) < 5
                            ? "#000000"
                            : getCostAtIndex(number) >= 5 &&
                              getCostAtIndex(number) < 10
                            ? "#4244E4"
                            : getCostAtIndex(number) >= 10 &&
                              getCostAtIndex(number) < 49
                            ? "#de4343"
                            : getCostAtIndex(number) >= 50 &&
                              getCostAtIndex(number) < 100
                            ? "#40b02f"
                            : "#FE7F37",
                      }}
                    >
                      {getCostAtIndex(number)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Dialog
        PaperProps={{
          sx: {
            bgColor: "background.paper",
            borderRadius: "20px !important",
            boxShadow: 24,
          },
        }}
        onClose={() => {
          setDialogIsOpen(false);
        }}
        closeAfterTransition
        open={dialogIsOpen}
      >
        <DialogTitle>
          <div
            onClick={() => setDialogIsOpen(false)}
            className={style.dialogTitle}
          >
            <CancelOutlined />
          </div>
        </DialogTitle>
        <DialogContent>
          <span className={`${style.description}`}>
            Guess what numbers will make cards win next game. If your number win{" "}
            <b className="raleway-bold">1 line</b> - your bet doubles 15 times,{" "}
            <b className="raleway-bold">2 lines</b> x25,{" "}
            <b className="raleway-bold">BINGO</b> x45.{" "}
            <b className="raleway-bold">Good luck!</b>
          </span>

          <div className="flex justify-between align-center p-15 mt-10">
            <div className="flex flex-column align-center">
              <h6
                className="mb-5 raleway-bold f-20"
                style={{
                  color: "#4FE439",
                  textShadow: "1px 1px 13px rgba(144, 255, 125, 0.5)",
                }}
              >
                LINE
              </h6>
              <h6 className="poppins-bold f-24">x15</h6>
            </div>
            <div className="flex flex-column align-center">
              <h6
                className="mb-5 raleway-bold f-20"
                style={{
                  color: "#FCE058",
                  textShadow: "1px 1px 13px rgba(252, 224, 88, 0.5)",
                }}
              >
                2 LINES
              </h6>
              <h6 className="poppins-bold f-24">x25</h6>
            </div>
            <div className="flex flex-column align-center">
              <h6
                className="mb-5 raleway-bold f-20"
                style={{
                  color: "#FF4B4B",
                  textShadow: "1px 1px 13px rgba(255, 75, 75, 0.5)",
                }}
              >
                BINGO
              </h6>
              <h6 className="poppins-bold f-24">x45</h6>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LuckyNumbersInfo;
