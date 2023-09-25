import React, { useEffect, useState } from "react";
import HighLow from "../game/HiLo/HighLow";
import style from "../../../styles/bingo90/index.module.scss";
import highLowStyles from "../../../styles/bingo90/highLow.module.scss";
import hiloStyle from "../../../styles/bingo90/hilo.module.scss";
import HiloLines from "./HiloLines";
import { AiOutlineDrag } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import Button from "../../common/button/Button";
import { FaAngleDown, FaQuestion } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md"
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";

const Hilo = ({
  messageData,
  currentNumber,
  isHiLoOpen,
  isMobile,
  isPlayingHiLo,
  toggleHilo,
  posFlipped,
  setPosFlipped,
  setIsBettedHilo,
  setCoinClient,
  setIsPlayingHiLo,
  hiLoDefaultCreditPurchase,
  setHiLoDefaultCreditPurchase,
  setMessageData,
  highLowCollect,
}) => {
  const getColor = () => {
    return currentNumber <= 16
      ? "rgba(137, 122, 20, 0.7)"
      : currentNumber <= 36
        ? "rgba(90, 21, 114, 0.7)"
        : currentNumber <= 54
          ? "rgba(51, 32, 124, 0.7)"
          : currentNumber <= 72
            ? "rgba(38, 136, 25, 0.7)"
            : "rgba(183, 70, 70, 0.7)";
  };

  const getBgColor = () => {
    return currentNumber <= 16
      ? "rgba(137, 122, 20, 0.3)"
      : currentNumber <= 36
        ? "rgba(90, 21, 114, 0.3)"
        : currentNumber <= 54
          ? "rgba(51, 32, 124, 0.3)"
          : currentNumber <= 72
            ? "rgba(38, 136, 25, 0.3)"
            : "rgba(183, 70, 70, 0.3)";
  };

  const [isExpanded, setIsExpanded] = useState(false)
  useEffect(() => {
    let timeoutId;

    if (isExpanded) {
      timeoutId = setTimeout(() => {
        if (!isPlayingHiLo) setIsExpanded(false)
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlayingHiLo, isExpanded])
  return (
    <div className={hiloStyle.container} style={{ position: "relative" }}>
      <div className={hiloStyle.topContainer} style={{ position: "absolute" }}>
        <AiOutlineDrag className={`drag-handle ${hiloStyle.dragIcon}`} />
        <IoClose onClick={toggleHilo} className={hiloStyle.closeIcon} style={{ visibility: !isPlayingHiLo && isMobile ? "" : "hidden" }} />
        {!isMobile && <FaQuestion onClick={toggleHilo} className={hiloStyle.dragIcon} style={{ visibility: !isPlayingHiLo && !isMobile ? "" : "hidden" }} />}
        {isMobile ? <BiTransfer
          className={`cancel-here ${hiloStyle.flipIcon}`}
          style={{
            visibility: isPlayingHiLo && "hidden",
            position: "absolute",
            right: posFlipped ? "" : "4rem",
            left: !posFlipped ? "" : "4rem",
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setPosFlipped(!posFlipped);
          }}
        /> : ""}
      </div>
      <div style={{ width: "fit-content", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          className="drag-handle"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.39)",
            width: isMobile ? "fit-content" : "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(3px)",
            padding: "0.5rem 0",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: posFlipped ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 0.3rem",
              gap: "1rem",
            }}
          >
            {isMobile ? <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isPlayingHiLo && (
                <Button
                  onClick={highLowCollect}
                  buttonText="Collect"
                  className={`${style.bingo90Button} cancel-here`}
                />
              )}

              {/* hilo container */}
              <div
                className={`cancel-here ${hiloStyle.hiloContainer}`}
                style={{
                  padding: isPlayingHiLo ? "0" : "5px 0rem",
                  // padding: "0",
                  backgroundColor: isPlayingHiLo ? getBgColor() : "",
                  borderColor: getColor(),
                }}
              >
                <HighLow
                  {...messageData}
                  gameId={messageData.gameId}
                  collect={messageData?.collect}
                  setClient={setCoinClient}
                  setIsPlayingHiLo={setIsPlayingHiLo}
                  lowWinnings={messageData.game?.low_winnings}
                  highWinnings={messageData.game?.high_winnings}
                  highLowBet={messageData.highLowBet}
                  creditValue={messageData.highLowCreditValue}
                  hiLoDefaultCreditPurchase={hiLoDefaultCreditPurchase}
                  setHiLoDefaultCreditPurchase={setHiLoDefaultCreditPurchase}
                  currentNumber={currentNumber}
                  setIsBettedHilo={setIsBettedHilo}
                  setMessageData={setMessageData}
                  titleColor={getColor()}
                />
              </div>
            </div> : ""}
            {(isHiLoOpen || !isMobile) && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {!isMobile && <div className={`${highLowStyles.hiloTitle}`}>
                    <div
                      className="flex justify-center align-center"
                      style={{ color: getColor(), fontSize: "0.8rem", margin: "0" }}
                    >
                      <HiOutlineArrowNarrowUp style={{ height: "28px" }} />
                      HI-LO
                      <HiOutlineArrowNarrowDown style={{ height: "28px" }} />
                    </div>
                  </div>}
                  <HiloLines
                    number={currentNumber}
                    numbersDrawn={messageData?.numbersDrawn}
                    posFlipped={posFlipped}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            )}
          </div>
          {!isPlayingHiLo && isMobile ? (
            <span className={hiloStyle.hiloInfo} style={{ paddingTop: "10px" }}>
              Guess will the next ball be higher or lower than current. Good luck!
            </span>
          ) : ""}
          {isExpanded ? <>
            {isPlayingHiLo && !isMobile && (
              <Button
                onClick={highLowCollect}
                buttonText="Collect"
                className={`${highLowStyles.scaledDownBingo90Button} cancel-here`}
              />
            )}
            <div
              className={`cancel-here ${highLowStyles.scaledDownHiloPurchase}`}
              style={{ maxWidth: "0", transform: "scale(0.5)", transformOrigin: "top center", width: "fit-content", background: "black" }}
            >
              <HighLow
                {...messageData}
                gameId={messageData.gameId}
                collect={messageData?.collect}
                setClient={setCoinClient}
                setIsPlayingHiLo={setIsPlayingHiLo}
                lowWinnings={messageData.game?.low_winnings}
                highWinnings={messageData.game?.high_winnings}
                highLowBet={messageData.highLowBet}
                creditValue={messageData.highLowCreditValue}
                hiLoDefaultCreditPurchase={hiLoDefaultCreditPurchase}
                setHiLoDefaultCreditPurchase={setHiLoDefaultCreditPurchase}
                currentNumber={currentNumber}
                setIsBettedHilo={setIsBettedHilo}
                setMessageData={setMessageData}
                titleColor={"rgba(0,0,0,0)"}
              />
            </div>
          </> : ""}
        </div>
        {!isExpanded ? <div style={{ height: "18px", background: "rgba(0,0,0,0.39)", backdropFilter: "blur(3px)", height: "fit-content", width: "fit-content", padding: "0 12px", borderRadius: "0 0 16px 16px", cursor: "pointer" }} onClick={() => setIsExpanded(true)}>
          <MdKeyboardArrowDown size={22} color="white" />
        </div> : ""}
      </div>
    </div>
  );
};

export default Hilo;
