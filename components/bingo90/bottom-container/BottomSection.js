import CardsPurchase from "../game/CardsGame/CardsPurchase";
import React, { useContext, useEffect, useState } from "react";
import { AppContext, Bingo90Context } from "../../../common/context";
import Tickets from "../game/Tickets";
import {
  bottomCenterContainer,
  bottomRightContainer,
} from "../../../styles/bingo90/tickets.module.css";
import swal from "sweetalert2";
import Chat from "../Chat";
import {
  rightSideDesktopFeatures,
  chatSectionContainer,
} from "../../../styles/bingo90/home.module.scss";
import { useMediaQuery } from "@mui/material";
import Loader from "../UI/B90Loader";
import LuckyNumbers from "../game/LuckyNumbers";
import style from "../../../styles/bingo90/index.module.scss";
import connectWebSocket90 from "../../../config/socket90";
import bottomStyle from "../../../styles/bingo90/bottom.module.scss";
import MiddleBar from "../MiddleBar";
import LuckyNumbersInfo from "../UI/LuckyNumbersInfo";
import CustomDialog from "../UI/CustomDialog";
import DraggableDialog from "../UI/DraggableDialog";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import Hilo from "../UI/Hilo";
import Image from "next/image";

const BottomSection = () => {
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

  const isMobileMin = useMediaQuery("(max-width:540px)");

  const isRotatedMobile =
    useMediaQuery("(max-width:920px)") &
    useMediaQuery("(max-height:770px)") &
    useMediaQuery("(min-height:765px)");
    
    const isTablet = (useMediaQuery("(max-width:920px) and (min-height: 450px)") & useMediaQuery("(min-width:540px) and (min-height: 450px)")) | 
    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));
  
  const {
    messageData,
    setMessageData,
    setCoinClient,
    isPlayingHiLo,
    setIsPlayingHiLo,
    isHiLoOpen,
    setIsHiLoOpen,
    isPurchaseCardsOpen,
    setIsPurchaseCardsOpen,
    hiLoDefaultCreditPurchase,
    setHiLoDefaultCreditPurchase,
    viewMode,
    isBettedHilo,
    setIsBettedHilo,
    matrixTickets,
    luckyDialogOpen,
    setIsBuyClicked,
    setLuckyDialogOpen,
    luckyInfoDialogOpen,
    setLuckyInfoDialogOpen,
    coinClient,
  } = useContext(Bingo90Context);

  const { availableChats, setAvailableChats } = useContext(AppContext);

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [isWider, setIsWider] = useState(true);
  const [posFlipped, setPosFlipped] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("CRT", new Date());
    console.log({ messageData });

    const onmessage = (message) => {
      const data = JSON.parse(message?.data);

      if (data?.tickets) {
        setNumberOfCards(data?.tickets?.length || 0);
      }
      if (data?.type === "warning") {
        new swal({
          title: "Insufficient Credits!",
          icon: "warning",
        });
      }
    };
    const client = connectWebSocket90("/ws/90/tickets/90/", onmessage);

    return () => {
      client.close();
    };
  }, []);

  useEffect(() => {
    if (!isMobile) setIsWider(true);

    if (isHiLoOpen) {
      setIsWider(false);
    } else if (isPurchaseCardsOpen) {
      setIsWider(false);
    } else {
      setIsWider(true);
    }
  }, [isHiLoOpen, isPurchaseCardsOpen]);

  const ticketsLen = messageData?.tickets?.length;

  // console.log("Is wider", isWider);
  useEffect(() => {
    if (!ticketsLen) {
      setIsPurchaseCardsOpen(true);
    } else {
      setIsPurchaseCardsOpen(false);
    }
  }, [ticketsLen]);

  const range = (start, end) => {
    return Array.apply(0, Array(end)).map((element, index) => index + start);
  };

  const numbersForLuckyNumberSelection = range(1, 90);

  const playNow = () => {
    setLuckyInfoDialogOpen(false);
    setLuckyDialogOpen(true);
  };

  const tapToHideHandler = () => {
    if (messageData?.tickets?.length) {
      setIsPurchaseCardsOpen(isPurchaseCardsOpen);
    } else {
      setIsPurchaseCardsOpen(true);
    }

    setIsBuyClicked(false);
    setLuckyInfoDialogOpen(false);
  };

  const toggleHilo = () => {
    setIsHiLoOpen(!isHiLoOpen);
    if (!messageData?.tickets?.length && isPurchaseCardsOpen) {
      setIsPurchaseCardsOpen(true);
    } else {
      setIsPurchaseCardsOpen(false);
    }
    setIsBuyClicked(false);
  };

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
        }
      }

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

      coinClient.send(
        JSON.stringify({
          type: "collect",
        })
      );

      setIsBettedHilo(!isBettedHilo);
    }
  };

  const flipPos = () => {
    setPosFlipped((prevState) => !prevState);
  };

  const currentNumber = messageData.game?.numbers_drawn?.length
    ? messageData?.game?.numbers_drawn[
        messageData.game?.numbers_drawn?.length - 1
      ]
    : 0;
  
  return (
    <div className="flex flex-column" >
      {(isMobile && !luckyInfoDialogOpen && !luckyDialogOpen && !isTablet) ||
      (messageData?.duration && isMobileMin && !isTablet ) ? (
        <MiddleBar />
      ) : (
        <></>
      )}

      <div className={`flex flex-column ${style.bottomContainer}`}>
        <div className="flex justify-between">
          {/* desktop chat section left side*/}
          {!isMobile || isRotatedMobile ? (
            <div className={chatSectionContainer}>
              {!isChatOpen ? (
                <div style={{ position: "absolute", bottom: "2%", left: "2%" }}>
                  <div className={style.chatIcon}>
                    <Image
                      src="/static/images/bingo90/chat-icon.png"
                      onClick={() => setIsChatOpen(true)}
                      layout="fill"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex" style={{ position: "relative" }}>
                  <Chat />
                  <div
                    onClick={() => setIsChatOpen(false)}
                    style={{ position: "absolute", right: "0", top:"-4%" }}
                  >
                    <img src="/static/images/bingo90/closeChatIcon.svg" height={42} width={42}/>
                  </div>
                </div>
              )}

              {/* chat existance status dot */}
              {availableChats.length > 0 ? (
                <div className={`${style.active}`}>
                  <span className={`${style.counter}`}>
                    {availableChats.length}
                  </span>
                </div>
              ) : (
                <></>
              )}

            </div>
          ) : (
            <></>
          )}

          {/* bottom center cards section */}
          {viewMode === "loading" ||
          messageData.type === "new" ||
          messageData.type === "scheduled" ? (
            <div className={`${bottomCenterContainer} block`} style={{margin:`${!isMobile && !isTablet ? "-7%" : "4%"} 48% 0 48%`}}>
              {/* <Loader /> */}
            </div>
          ) : (
            <div className={`${bottomCenterContainer} block`} >
              {/* show/hide depending on lucky opening */}
              {isPurchaseCardsOpen && (
                <CardsPurchase
                  className={`${bottomStyle.cardsPurchaseContainer}`}
                />
              )}

              {messageData?.inGame &&
              messageData?.tickets?.length &&
              !messageData?.countdown ? (
                <Tickets isWider={isWider} isMobile={isMobile} />
              ) : (
                <></>
              )}
            </div>
          )}

          {/* desktop design bottom right side*/}
          {viewMode === "loading" ||
          messageData.type === "new" ||
          messageData.type === "scheduled" ? (
            <></>
          ) : (
            <div
              className={`${rightSideDesktopFeatures} ${bottomRightContainer}`}
            >
              {messageData?.inGame &&
              messageData?.tickets?.length &&
              !messageData?.countdown ? (
                <CardsPurchase
                  className={`${bottomStyle.cardsPurchaseContainer}`}
                />
              ) : (
                <div className={`${rightSideDesktopFeatures} ${bottomRightContainer}`}></div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* mobile lucky  info dialog*/}
      {viewMode === "game" && messageData?.inGame && isMobile && (
        <CustomDialog isOpen={luckyInfoDialogOpen}>
          <LuckyNumbersInfo
            numbersForLuckyNumberSelection={numbersForLuckyNumberSelection}
            one_number_tickets={matrixTickets}
            playNowHandler={playNow}
            tapToHideHandler={tapToHideHandler}
          />
        </CustomDialog>
      )}

      {/* mobile lucky numbers dialog */}
      {isMobile && (
        <CustomDialog isOpen={luckyDialogOpen}>
          <LuckyNumbers />
        </CustomDialog>
      )}

      {/* mobile hilo dialog */}
      {isHiLoOpen && isMobile && !messageData?.duration && (
        <DraggableDialog position={"absolute"} width={"fit-content"}>
          <Hilo
            messageData={messageData}
            currentNumber={currentNumber}
            isHiLoOpen={isHiLoOpen}
            isMobile={isMobile}
            isPlayingHiLo={isPlayingHiLo}
            toggleHilo={toggleHilo}
            posFlipped={posFlipped}
            setPosFlipped={setPosFlipped}
            setIsBettedHilo={setIsBettedHilo}
            setCoinClient={setCoinClient}
            setIsPlayingHiLo={setIsPlayingHiLo}
            hiLoDefaultCreditPurchase={hiLoDefaultCreditPurchase}
            setHiLoDefaultCreditPurchase={setHiLoDefaultCreditPurchase}
            highLowCollect={highLowCollect}
          />
        </DraggableDialog>
      )}

      {/*mobile hilo info dialog */}
      <Dialog
        PaperProps={{
          sx: {
            bgColor: "background.paper",
            borderRadius: "30px !important",
            boxShadow: 24,
            zIndex: 2000,
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
            style={{ color: "blue", textAlign: "right" }}
          >
            <CancelOutlined />
          </div>
        </DialogTitle>
        <DialogContent>
          <div
            className="flex flex-column items-center justify-center"
            style={{
              height: "100px",
              width: "200px",
              fontSize: "20px",
              textAlign: "center",
              gap: "3px",
              fontFamily: "Poppins",
            }}
          >
            <span>
              Guess will the next ball be higher or lower than current.
            </span>
            <span>Good luck!</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BottomSection;
