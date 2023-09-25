import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";

import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import style from "../../styles/bingo90/index.module.scss";
import Button from "../common/button/Button";
``;
import { AppContext, Bingo90Context } from "../../common/context";
import { useContext } from "react";
import Chat from "../tablet-view/Chat";
import Image from "next/image";
import {
  backToGame,
  playersCount,
  chatTopBar,
} from "../../styles/home.module.scss";
import styles from "../../styles/modal.module.css";
import { Groups } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Portal from "../bingo90/UI/portal";
function MiddleBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const { availableChats, setAvailableChats } = useContext(AppContext);
  const [isHiLoClicked, setIsHiLoClicked] = useState(false);
  const {
    isPlayingHiLo,
    messageData,
    isHiLoOpen,
    isPurchaseCardsOpen,
    setIsHiLoOpen,
    setIsPurchaseCardsOpen,
    isMiddleBarButtonsVisible,
    isBuyClicked,
    setIsBuyClicked,
    setLuckyInfoDialogOpen,
    luckyDialogOpen,
    luckyInfoDialogOpen,
    setLuckyDialogOpen,
  } = useContext(Bingo90Context);

  const toggleHilo = () => {
    setIsHiLoOpen(!isHiLoOpen);
    if (!messageData?.tickets?.length && isPurchaseCardsOpen) {
      setIsPurchaseCardsOpen(true);
    } else {
      setIsPurchaseCardsOpen(false);
    }
    setIsHiLoClicked(!isHiLoClicked);
    setIsBuyClicked(false);
  };

  const togglePurchaseCards = () => {
    setIsPurchaseCardsOpen(!isPurchaseCardsOpen);
    // console.log(">>>>>>>>>>>>>>>>>> ",!messageData?.tickets?.length)
    if (!messageData?.tickets?.length && isHiLoOpen) {
      setIsHiLoOpen(true);
    } else {
      setIsHiLoOpen(false);
    }
    setIsBuyClicked(!isBuyClicked);
    setIsHiLoClicked(false);
  };

  const openLuckyInfo = () => {
    setLuckyInfoDialogOpen(true);
  };

  const openLucky = () => {
    setLuckyDialogOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex ${style.middleBar} ${
        messageData?.duration ? "justify-between" : ""
      }`}
    >
      {/* mobile toogle chat icon */}
      <div
        className={`${style.chatIcon} ${style.mobileFeatures}`}
        onClick={openModal}
      >
        {isModalOpen ? (
          <BsChatDots className={`${style.icon} ${style.whiteBgIcon}`} />
        ) : (
          <Image
            height={45}
            width={45}
            src="/static/images/bingo90/chat-icon.png"
          />
        )}

        {availableChats.length > 0 ? (
          <div className={`${style.active}`}>
            <span className={`${style.counter}`}>{availableChats.length}</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* buttons */}
      {isMiddleBarButtonsVisible && !messageData?.duration && (
        <div className="flex justify-center items-center ml-15 gap-1">
          {/* toggle hilo button */}
          {!isPlayingHiLo && (
            <button
              onClick={toggleHilo}
              className={`${
                isHiLoOpen ? style.roundedButtonWhiteBg : style.roundedButton
              } `}
            >
              <div className="flex justify-center items-center">
                <FaLongArrowAltUp style={{ height: "24px", width: "10px" }} />
                <FaLongArrowAltDown style={{ height: "24px", width: "10px" }} />
              </div>
            </button>
          )}

          {/* toggle purchase cards button */}
          {!isPlayingHiLo && messageData?.tickets?.length ? (
            <Button
              onClick={togglePurchaseCards}
              buttonText={
                <>
                  <Image
                    src={`/static/images/bingo90/${
                      isPurchaseCardsOpen ? "orangeCard" : "card"
                    }.svg`}
                    alt="card"
                    width={25}
                    height={25}
                  />
                </>
              }
              className={`${
                isPurchaseCardsOpen
                  ? style.roundedButtonWhiteBg
                  : style.roundedButton
              }`}
            />
          ) : (
            <></>
          )}

          {/* toggle lucky button */}
          <button
            className={`${
              luckyInfoDialogOpen || luckyDialogOpen
                ? style.roundedButtonWhiteBg
                : style.roundedButton
            }`}
            onClick={openLuckyInfo}
          >
            <Image
              alt="pp"
              height={35}
              width={35}
              src={`/static/images/bingo90/${
                luckyInfoDialogOpen || luckyDialogOpen
                  ? "touchIconOrange"
                  : "touchIcon"
              }.svg`}
            />
          </button>
        </div>
      )}

      {/* lucky toggle button during countdown */}
      {messageData?.duration ? (
        <button
          className={`${
            luckyDialogOpen ? style.roundedButtonWhiteBg : style.roundedButton
          }`}
          onClick={openLucky}
        >
          <Image
            alt="pp"
            height={35}
            width={35}
            src={`/static/images/bingo90/${
              luckyDialogOpen ? "touchIconOrange" : "touchIcon"
            }.svg`}
          />
        </button>
      ) : (
        <></>
      )}
      <Portal>
        <div style={{ position: "fixed" }}>
          {/* chat dialog */}
          <div className={`${styles.modal} ${isModalOpen ? styles.open : ""}`}>
            <div className={styles.overlay} onClick={closeModal}></div>
            <div
              className={`${styles.modalcontent} ${
                isKeyboardOpen ? styles.keyboardOpen : styles.keyboardClose
              }`}
            >
              {/* <div className={styles.modalcontent}> */}

              <div
                style={{
                  color: "white",
                  position: "fixed",
                  top: "1px",

                  // padding:"10px",
                }}
                className={`${chatTopBar}`}
              >
                <span onClick={closeModal}>
                  <ArrowBackIosNewIcon
                    style={{
                      fontSize: "35px",
                      margin: "1px",
                    }}
                  />
                </span>
                <span
                  on
                  className={`${backToGame}`}
                  onClick={closeModal}
                  style={{}}
                >
                  Back To Game
                </span>
                <span
                  key={Math.random()}
                  title={"Players"}
                  className={`${playersCount}`}
                >
                  <span
                    style={{
                      marginLeft: "50px",
                    }}
                  >
                    <Image
                      alt={`avatar`}
                      height={24}
                      width={24}
                      src={"/static/images/profile.png"}
                    />
                  </span>
                  <span
                    style={{
                      marginLeft: "5px",
                    }}
                  >
                    <Image
                      alt={`avatar`}
                      height={24}
                      width={24}
                      src={"/static/images/profile.png"}
                    />
                  </span>
                  <span
                    style={{
                      marginLeft: "5px",
                    }}
                  >
                    <Image
                      alt={`avatar`}
                      height={24}
                      width={24}
                      src={"/static/images/profile.png"}
                    />
                  </span>

                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "17px",
                    }}
                  >
                    {messageData.playersCount}
                  </span>
                  <span
                    style={{
                      marginLeft: "5px",
                    }}
                  >
                    <Groups
                      style={{
                        fontSize: "30px",
                      }}
                    />
                  </span>
                </span>
              </div>
              <Chat />
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
}

export default MiddleBar;
