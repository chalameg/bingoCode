import Battery from "./Battery";
import Connection from "./Connection";
import Time from "./Time";
import { tabletTopBar } from "../../styles/index.module.scss";
import prizesStyles from "../../styles/prizes.module.css";
import {
  profileAvatar,
  collectButton,
  balance,
  buyButton,
  chatIcon,
  icon,
  whiteBgIcon,
  mobileFeatures,
  desktopFeatures,
  active,
} from "../../styles/home.module.scss";
import ProfileAvatar from "../tablet-view/ProfileAvatar";
import { AppContext, HomeContext } from "../../common/context";
import { useContext } from "react";
import Button from "../common/button/Button";
import Link from "next/link";
import {
  BsArrowDown,
  BsArrowUp,
  BsChatDots,
  BsChatDotsFill,
} from "react-icons/bs";
import { useState } from "react";
import Chat from "./Chat";
import Dialog from "@mui/material/Dialog";

const TabletTopAuthBar = () => {

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const {availableChats, setAvailableChats} = useContext(AppContext);
  const {
    playerBalance,
    coinClient,
    isPlayingHiLo,
    messageData,
    isHiLoOpen,
    isPurchaseCardsOpen,
    setIsHiLoOpen,
    setIsPurchaseCardsOpen,

    setMessageData,
  } = useContext(HomeContext);

  const highLowCollect = () => {
    if (coinClient?.readyState === 1) {
      const audio =
        typeof Audio !== "undefined"
          ? new Audio("/sounds/buttons/collect.mp3")
          : undefined;
      const ISSERVER = typeof window === "undefined";
      
      if (!ISSERVER) {
        const flag = localStorage.getItem("soundEnabled");
        if (flag === "true") {
          audio.play();
          setMessageData((previous) => {
            return {
              ...previous,
              collect: true,
            };
          });
          
          setTimeout(() => {
            setMessageData((previous) => {
              return {
                ...previous,
                collect: false,
              };
            });
          }, 3000);
        }
      }
      coinClient.send(
        JSON.stringify({
          type: "collect",
        })
      );
    }
  };

  const toggleHilo = () => {
    setIsHiLoOpen(!isHiLoOpen);
    setIsPurchaseCardsOpen(false);
  };

  const togglePurchaseCards = () => {
    setIsPurchaseCardsOpen(!isPurchaseCardsOpen);
    setIsHiLoOpen(false);
  };
  return (
    <div className={`flex justify-between align-center ${tabletTopBar}`}>
      <div
        className={`${chatIcon} ${mobileFeatures}`}
        onClick={() => setDialogIsOpen(true)}
      >
        {dialogIsOpen ? (
          <BsChatDots
            className={`${icon} ${whiteBgIcon}`}
            style={{ color: "blue" }}
          />
        ) : (
          <BsChatDotsFill className={`${icon}`} />
        )}

        {availableChats.length>0 && !dialogIsOpen ? (<div className={`${active}`} ></div>) : (<></>)}
      
      </div>

      <div className={`${chatIcon} ${desktopFeatures}`}>
        {availableChats.length>0 ? (
          <>
            <BsChatDotsFill className={`${icon}`} style={{ color: "" }} />
            <div className={`${active}`}></div>
          </>
        ) : (
          <BsChatDots className={`${icon}`} style={{ fontWeight: "bold" }} />
        )}
      </div>

      {/* if player has cards render buy and hilo buttons here */}
      {!isPlayingHiLo && (
        <Button
          onClick={toggleHilo}
          className={`${collectButton} ${mobileFeatures} orangeButton luckiestBtn flex align-center`}
          icon={
            <>
              <BsArrowUp style={{ height: "13px" }} />
              <span>hi-lo</span>
              <BsArrowDown style={{ height: "13px" }} />
            </>
          }
        />
      )}

      {!isPlayingHiLo && messageData?.tickets?.length ? (
        <Button
          onClick={togglePurchaseCards}
          buttonText="Buy"
          className={`${collectButton} ${buyButton} orangeButton luckiestBtn`}
        />
      ) : null}

      <div className={`flex justify-between align-center`}>
        <div className={`flex justify-between align-center`}>
          {isPlayingHiLo ? (
            <Button
              onClick={highLowCollect}
              buttonText="Collect"
              className={`${collectButton} orangeButton`}
            />
          ) : null}
          <span className={balance}>{playerBalance}</span>
          <img
            className={prizesStyles.coin}
            src={"/static/images/yellowCoin.png"}
            alt="coin icon"
          />
        </div>
        <div className={`${profileAvatar}`}>
          <Link href="/">
            <a>
              <ProfileAvatar />
            </a>
          </Link>
        </div>
      </div>

      <Dialog
        PaperProps={{
          sx: {
            position: "absolute",
            bottom:"0px",
            backgroundColor: "rgba(227, 227, 227, 0.9) !important",
            borderRadius: "20px !important",
            border:"4px solid White",
          }
        }}
        onClose={() => {
          setDialogIsOpen(false);
        }}
        open={dialogIsOpen}
      >
        <div>
          <Chat />
        </div>
      </Dialog>
      
    </div>
  );
};
export default TabletTopAuthBar;
