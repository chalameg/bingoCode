import TabletTopAuthBar from "../tablet-view/TabletTopAuthBar";
import CardsPurchase from "../game/CardsGame/CardsPurchase";
import HighLow from "../game/HiLo/HighLow";
import React, { useContext, useEffect, useState } from "react";
import { HomeContext, AppContext } from "../../common/context";
import Tickets from "../game/Tickets";
import {
  bottomHeight,
  bottomCenterContainer,
  bottomRightContainer,
} from "../../styles/tickets.module.css";
import connectWebSocket from "../../config/socket";
import swal from "sweetalert2";
import Chat from "../tablet-view/Chat";
import {
  mobileFeatures,
  rightSideDesktopFeatures,
  mobileLandscapeView
} from "../../styles/home.module.scss";
import { useMediaQuery } from "@mui/material";
import Loader from "../common/loader/Loader";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:991px)")
  const isRotatedMobile =  useMediaQuery('(max-width:1024px) and (max-height:770px) and (min-height:765px) , (max-width:916px) and (orientation:landscape)') ;

  const {
    messageData,
    setCoinClient,
    setIsPlayingHiLo,
    isHiLoOpen,
    isPurchaseCardsOpen,
    hiLoDefaultCreditPurchase,
    setHiLoDefaultCreditPurchase,
  } = useContext(HomeContext);
  const { loading } = useContext(AppContext);

  const [numberOfCards, setNumberOfCards] = useState(0);

  useEffect(() => {
    localStorage.setItem("CRT", new Date());
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
    const client = connectWebSocket("/ws/tickets/75/", onmessage);
    return () => {
      client.close();
    };
  }, []);
  
  return (
    <div className={`flex flex-column ${bottomHeight}`}>
      <TabletTopAuthBar />

      <div className="flex">
        {!isMobile ? <Chat /> : <></>}

        {/* for rotated 768x1024 */}
        {isRotatedMobile ? <Chat /> : <></>}

        {loading ||
        messageData.type === "new" ||
        messageData.type === "scheduled" ? (
          <div className={`${bottomCenterContainer} block`}>
            <Loader />
          </div>
        ) : (
          <div className={`${bottomCenterContainer} block`}>
            {isHiLoOpen ? (
              <div className={`${mobileFeatures}`}>
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
                  currentNumber={
                    messageData.game?.numbers_drawn?.length
                      ? messageData?.game?.numbers_drawn[
                          messageData.game?.numbers_drawn?.length - 1
                        ]
                      : 0
                  }
                />
              </div>
            ) : null}

            {!messageData?.inGame ||
            !messageData?.tickets?.length ||
            isPurchaseCardsOpen ? (
              <CardsPurchase />
            ) : null}

            {!messageData?.countdown &&
              numberOfCards === 0 &&
              messageData?.tickets?.length === 0 &&
              !isHiLoOpen && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {messageData?.inGame && <div className={` ${mobileLandscapeView} `}>game in progress,</div>}

                  <div className={`${mobileLandscapeView}`}>buy cards for the next round</div>
                </div>
              )}

            {messageData?.inGame &&
            messageData?.tickets?.length &&
            !messageData?.countdown ? (
              <Tickets />
            ) : null}
          </div>
        )}

        {loading ||
        messageData.type === "new" ||
        messageData.type === "scheduled" ? (
          <></>
        ) : (
          <div
            className={`${rightSideDesktopFeatures} ${bottomRightContainer}`}
          >
            <HighLow
              {...messageData}
              gameId={messageData.gameId}
              setClient={setCoinClient}
              setIsPlayingHiLo={setIsPlayingHiLo}
              lowWinnings={messageData.game?.low_winnings}
              highWinnings={messageData.game?.high_winnings}
              highLowBet={messageData.highLowBet}
              creditValue={messageData.highLowCreditValue}
              hiLoDefaultCreditPurchase={hiLoDefaultCreditPurchase}
              setHiLoDefaultCreditPurchase={setHiLoDefaultCreditPurchase}
              currentNumber={
                messageData.game?.numbers_drawn?.length
                  ? messageData?.game?.numbers_drawn[
                      messageData.game?.numbers_drawn?.length - 1
                    ]
                  : 0
              }
            />

            {messageData?.inGame &&
            messageData?.tickets?.length &&
            !messageData?.countdown ? (
              <CardsPurchase />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
