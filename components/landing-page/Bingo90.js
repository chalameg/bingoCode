import { North, South } from "@mui/icons-material";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../common/context";
import connectWebSocket from "../../config/socket";
import landingPageStyles from "../../styles/landingPage.module.scss";

function Bingo90() {
  const [playersCount, setPlayersCount] = useState(0);
  const [jackpotCreditValue, setjackpotCreditValue] = useState(0);
  const [jackpotWinCount, setjackpotWinCount] = useState(0);
  const [currentBingoAmount, setcurrentBingoAmount] = useState(0);
  const { messageData } = useContext(HomeContext);
  const [startTime, setstartTime] = useState(
    Math.floor((90 - (messageData?.game?.numbers_drawn?.length || 0)) / 18)
  );

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);   
    setstartTime((prev) =>
      jsonData?.message?.game?.numbers_drawn
        ? Math.floor((90 - (jsonData?.message?.game?.numbers_drawn?.length || 0)) / 18)
        : prev
    );
    const currentBingo = jsonData?.message?.game?.next_prizes
      ? jsonData?.message?.game?.next_prizes?.filter(
          (next_prize) => next_prize.name === "Bingo"
        )
      : [];
    setjackpotCreditValue((prev) =>
      jsonData?.jackpot_credit_value ? jsonData?.jackpot_credit_value : prev
    );
    setjackpotWinCount((prev) =>
      jsonData?.jackpot_win_count ? jsonData?.jackpot_win_count : prev
    );
    setcurrentBingoAmount((prev) =>
      currentBingo.length ? currentBingo[0].credit_value : prev
    );
    if (jsonData?.message?.game?.player_count) {
      setPlayersCount(jsonData?.message?.game.player_count);
    }
  };
  useEffect(() => {
    const client = connectWebSocket("/ws/landing/90/", onGameMessageReceived);

    return () => {
      client.close();
    };
  }, []);
  return (
    <Link href="/bingo90" passHref>
      <div className={`${landingPageStyles.bingo90}`}>
        <Box className={`${landingPageStyles.bingo90TopTitleContainer}`}>
          <img
            className={`${landingPageStyles.bingoNumber}`}
            src="/static/images/bingo90/Bingo90.svg"
            alt="bingo 90"
          />
          <Box display="flex" alignItems="center" gap="5px">
            <img
              className={`${landingPageStyles.numberTitle}`}
              src="/static/images/bingo90/9.svg"
              alt="9"
            />
            <img
              className={`${landingPageStyles.numberTitle}`}
              src="/static/images/bingo90/0.svg"
              alt="0"
            />
          </Box>

          <img
            src="/static/images/logo-ball.png"
            className={`${landingPageStyles.logoBall}`}
            alt="logo-b90"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="5px"
          mb={2}
        >
          {/* <fieldset>
          <legend>AAA</legend>
        </fieldset> */}
          <Box width="100px" position="relative">
            <Box className={`${landingPageStyles.bingoExtra}`}></Box>
            <Box className={`${landingPageStyles.bingoExtraGame}`}>
              Extra Game
            </Box>

            <Box className={`${landingPageStyles.bingo90luckyContainer}`}>
              <Box marginBottom="1px">
                <div style={{ height: "10px" }}>Lucky</div>
                <div>Number</div>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="2px"
                color="black"
                fontSize="8px"
                fontWeight="900"
              >
                <Box
                  height="15px"
                  width="15px"
                  borderRadius="2px"
                  sx={{
                    background: "rgba(255, 255, 255, 0.68)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  55
                </Box>
                <Box
                  height="15px"
                  width="15px"
                  boxShadow="0px 0px 4px #90FF7D"
                  borderRadius="2px"
                  sx={{
                    background: "#4FE439",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  56
                </Box>
                <Box
                  height="15px"
                  width="15px"
                  borderRadius="2px"
                  position="relative"
                  sx={{
                    background: "rgba(255, 255, 255, 0.68)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  57
                </Box>
                <img
                  src="/static/images/bingo90/chips-10.svg"
                  alt="chips 10"
                  style={{ position: "absolute", right: "-9px", top: "21px" }}
                />
              </Box>
            </Box>
          </Box>
          <button className={`${landingPageStyles.bingo90play}`}>PLAY</button>
          <Box width="100px" position="relative">
            <Box className={`${landingPageStyles.bingoExtra}`}></Box>
            <Box className={`${landingPageStyles.bingoExtraGame}`}>
              Extra Game
            </Box>

            <Box
              fontSize="10px"
              lineHeight="15px"
              fontWeight="700"
              fontFamily="Poppins"
              color="white"
              position="absolute"
              top="10px"
              width="100%"
              textAlign="center"
              zIndex="1000"
            >
              <Box className={`${landingPageStyles.bingoHiLoContainer}`}>
                <Box display="flex" alignItems="center" fontSize="15px">
                  <North fontSize="15px" />
                  HI
                </Box>
                <div style={{ fontSize: "15px" }}>-</div>
                <Box display="flex" alignItems="center" fontSize="15px">
                  Lo
                  <South fontSize="15px" />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="5px"
              >
                <Box
                  color="#2D2D2D"
                  borderRadius="6.5px"
                  fontSize="8px"
                  sx={{ background: "#FFE24A" }}
                  width="31px"
                  fontWeight="900"
                >
                  61.00
                </Box>
                <Box
                  color="white"
                  borderRadius="6.5px"
                  fontSize="8px"
                  sx={{ background: "#11298A" }}
                  width="31px"
                  fontWeight="900"
                >
                  10.80
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={`${landingPageStyles.bingo90FillContainer}`}>
          <Box
            className={`${landingPageStyles.bingo90BallsAndBorderContainer}`}
          >
            <img
              src="/static/images/bingo90/86-1.svg"
              alt="86"
              className={`${landingPageStyles.bingo90BallsMobile}`}
            />
            <Box position="relative" width="100%" margin="auto">
              <Box
                mb={1}
                className={`${landingPageStyles.bingo90BingoBorder}`}
              ></Box>

              <Box
                position="absolute"
                top="0"
                display="flex"
                justifyContent="space-between"
                width="100%"
                height="100%"
                padding="8px 15px"
                mb={1}
              >
                <Box display="flex" alignItems="center">
                  <img
                    src="/static/images/BINGO90.svg"
                    alt="bingo text"
                    className={`${landingPageStyles.bingoImage}`}
                  />
                </Box>

                <Box
                  className={`${landingPageStyles.bingoAmmount}`}
                  style={{ textShadow: "0px 0px 8px #1CFF5B" }}
                >
                  {currentBingoAmount}
                </Box>
                {/* </Box> */}
                <img src="/static/images/bingo90/pile.svg" alt="pile coin" />
              </Box>
            </Box>
            <img
              className={`${landingPageStyles.bingo90BallsMobile}`}
              src="/static/images/bingo90/24-1.svg"
              alt="24"
            />
          </Box>

          <Box
            className={`${landingPageStyles.bingo90BallsAndBorderContainer}`}
          >
            <img
              className={`${landingPageStyles.bingo90BallsMobile}`}
              src="/static/images/bingo90/50-1.svg"
              alt="50"
            />
            <Box position="relative" width="100%" margin="auto">
              <Box
                className={`${landingPageStyles.bingo90JackpotBorder}`}
              ></Box>
              <Box
                position="absolute"
                top="0"
                display="flex"
                justifyContent="space-between"
                width="100%"
                height="100%"
                padding="8px 15px"
              >
                <Box
                  fontSize="11px"
                  width="fit-content"
                  className={`${landingPageStyles.bingo90JackpotText}`}
                >
                  <div>JACKPOT</div>
                  <span>until {jackpotWinCount} out</span>
                </Box>
                <Box
                  className={`${landingPageStyles.jackpotCreditValue}`}
                  style={{ textShadow: "0px 0px 8px #1CFF5B" }}
                >
                  {jackpotCreditValue}
                </Box>
                <Box display="flex" alignItems="center">
                  <img
                    src="/static/images/bag.svg"
                    alt="pile coin"
                    className={`${landingPageStyles.bingoBag}`}
                  />
                </Box>
              </Box>
            </Box>
            <img
              className={`${landingPageStyles.bingo90BallsMobile}`}
              src="/static/images/bingo90/71-1.svg"
              alt="71"
            />
          </Box>
        </Box>

        <Box mt={2} className={`${landingPageStyles.bingo90BallContainer}`}>
          <img
            src="/static/images/bingo90/86-1.svg"
            alt="86"
            className={`${landingPageStyles.bingo90Balls}`}
          />
          <img
            className={`${landingPageStyles.bingo90Balls}`}
            src="/static/images/bingo90/24-1.svg"
            alt="24"
            style={{ marginTop: "20px" }}
          />
          <img
            className={`${landingPageStyles.bingo90Balls}`}
            src="/static/images/bingo90/50-1.svg"
            alt="50"
          />
          <img
            className={`${landingPageStyles.bingo90Balls}`}
            src="/static/images/bingo90/71-1.svg"
            alt="71"
            style={{ marginTop: "20px" }}
          />
          <img
            className={`${landingPageStyles.bingo90Balls}`}
            src="/static/images/bingo90/9-1.svg"
            alt="9"
          />

          <Box className={`${landingPageStyles.bingo90Price}`}>
            <Box>
              <img src="/static/images/bingo90/card.svg" alt="card" />

              <span
                style={{ color: "white", fontSize: "16px", marginLeft: "3px" }}
              >
                Price
              </span>
            </Box>
            <Box display="flex" justifyContent="center">
              <span style={{ fontSize: "23px", color: "white" }}>10</span>
              <img
                src="/static/images/yellowCoin.png"
                style={{
                  height: "24px",
                  width: "24px",
                }}
                alt="coin"
              />
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={`${landingPageStyles.bingo90BottomContainer}`}
        >
          <Box
            display="flex"
            alignItems="end"
            className={`${landingPageStyles.bingoPlayerCountContainer}`}
          >
            <span style={{ color: "white", marginRight: "5px" }}>
              {playersCount}
            </span>
            <img src="/static/images/bingo90/online.svg" alt="online" />
          </Box>

          <Box className={`${landingPageStyles.bingo90PriceMobile}`}>
            <Box>
              <img src="/static/images/bingo90/card.svg" alt="card" />

              <span
                style={{ color: "white", fontSize: "16px", marginLeft: "3px" }}
              >
                Price
              </span>
            </Box>
            <Box display="flex" justifyContent="center">
              <span style={{ fontSize: "23px", color: "white" }}>10</span>
              <img
                src="/static/images/yellowCoin.png"
                style={{
                  height: "24px",
                  width: "24px",
                }}
                alt="coin"
              />
            </Box>
          </Box>

          <Box className={`${landingPageStyles.bingo90GameStart}`}>
            <span
              style={{ color: "white", marginRight: "5px", fontSize: "14px" }}
            >
              Next game in
            </span>
            <Box
              className={`${landingPageStyles.bingoNextGameContainer}`}
              sx={{ backdropFilter: "blur(2px)" }}
            >
              <Box fontSize="20px" color="white">
                {startTime} min
              </Box>
            </Box>
          </Box>

          <Box className={`${landingPageStyles.bingo90GameStartMobile}`}>
            <span style={{ marginRight: "10px", fontSize: "14px" }}>
              Next game{" "}
            </span>
            <span style={{ fontSize: "20px" }}> in {startTime} min</span>
          </Box>
        </Box>
      </div>
    </Link>
  );
}

export default Bingo90;
