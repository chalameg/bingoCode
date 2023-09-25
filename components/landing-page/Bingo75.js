import { North, South } from "@mui/icons-material";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../common/context";
import connectWebSocket from "../../config/socket";
import landingPageStyles from "../../styles/landingPage.module.scss";

function Bingo75() {
  const { messageData } = useContext(HomeContext);
  const [jackpotCreditValue, setjackpotCreditValue] = useState(0);
  const [jackpotWinCount, setjackpotWinCount] = useState(0);
  const [currentBingoAmount, setcurrentBingoAmount] = useState(0);
  const [startTime, setstartTime] = useState(
    Math.floor((75 - (messageData?.game?.numbers_drawn?.length || 0)) / 18)
  );
  const [playersCount, seplayersCount] = useState(0);

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);
    setstartTime((prev) =>
      jsonData?.message?.game?.numbers_drawn
        ? Math.floor((75 - (jsonData?.message?.game?.numbers_drawn?.length || 0)) / 18)
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
      seplayersCount(jsonData?.message?.game.player_count);
    }
  };
  useEffect(() => {
    const client = connectWebSocket("/ws/landing/75/", onGameMessageReceived);

    return function () {
      // clearInterval(interval);
      client.close();
    };
  }, []);

  const router = useRouter();
  const playNow = () => {
    router.push("/bingo75");
  };

  return (
    <Link href="/bingo75" passHref>
      <div className={`${landingPageStyles.bingo75}`}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={`${landingPageStyles.bingo75Number}`}
        >
          <img
            src="/static/images/Bingo75.svg"
            alt="bingo 75"
            style={{ zIndex: 10 }}
            className={`${landingPageStyles.bingo75Image}`}
          />
        </Box>

        <Box
          className={`${landingPageStyles.bingo75PlayButtonContainer}`}
          position="relative"
          zIndex="8"
          mb={2}
        >
          {/* <fieldset>
          <legend>AAA</legend>
        </fieldset> */}
          <Box className={`${landingPageStyles.bingo75Price}`}>
            <Box>
              <img src="/static/images/bingo90/card.svg" alt="card" />

              <span
                style={{ color: "white", fontSize: "16px", marginLeft: "3px" }}
              >
                Price
              </span>
            </Box>
            <Box display="flex" alignItems="center">
              <span style={{ fontSize: "20px", color: "white" }}>10</span>
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
          <button className={`${landingPageStyles.bingo75play}`}>PLAY</button>
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
              // left="25%"
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

        <Box
          position="relative"
          zIndex="10"
          className={`${landingPageStyles.bingo75BoxContainer}`}
        >
          <Box
            position="relative"
            marginLeft="auto"
            className={`${landingPageStyles.bingo75Box}`}
          >
            <Box
              className={`${landingPageStyles.bingo75BingoBorder}`}
              mb={1}
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
                  src="/static/images/BINGO.svg"
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

              <img src="/static/images/bingo90/pile.svg" alt="pile coin" />
            </Box>
          </Box>

          <Box
            position="relative"
            marginLeft="auto"
            className={`${landingPageStyles.bingo75Box}`}
          >
            <Box className={`${landingPageStyles.bingo75JackpotBorder}`}></Box>
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
        </Box>

        <Box className={`${landingPageStyles.bingo75AvatarImage}`} zIndex="10">
          <img src="/static/images/show.svg" />
        </Box>

        <img
          src="/static/images/crowd-mobile.svg"
          style={{ zIndex: "20" }}
          className={`${landingPageStyles.bingo75CrowdImage}`}
        />

        <Box className={`${landingPageStyles.bingo75Bottom}`} zIndex="30">
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

        <Box position="absolute" top="0" left="0">
          <img
            src="/static/images/75boxbg.svg"
            alt="bingo 75 background"
            className={`${landingPageStyles.bingo75BoxBg}`}
          />
        </Box>

        {/* <button className={`${landingPageStyles.comingSoonBtn}`}>Coming Soon!</button> */}
      </div>
    </Link>
  );
}

export default Bingo75;
