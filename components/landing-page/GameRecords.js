import React from "react";
import landingPageStyles from "../../styles/landingPage.module.scss";
import BingoRecord from "./BingoRecord";
import Record from "./Record";

function GameRecords() {
  return (
    <div>
      <h2
        className={`${landingPageStyles.gameRecordTitle}`}
        style={{ marginLeft: "16%" }}
      >
        Game Records
      </h2>
      <div className={`${landingPageStyles.gameRecords}`}>
        <Record
          userImg="/static/images/lissa.png"
          userName="Lissa"
          startCoins={10}
          collectedCoins={3234}
          gameImg="/static/images/highlow.png"
          time="2022"
        />
        <BingoRecord
          userImg="/static/images/facebook-avatar.png"
          userName="Maria"
          collectedCoins={4562}
          gameImg="/static/images/logo-ball.png"
          time="2022"
        />
        <BingoRecord
          userImg="/static/images/tabitha.jpg"
          userName="Tabitha"
          collectedCoins={2748}
          gameImg="/static/images/bingo75.png"
          time="2022"
        />

        {/* </div>
      <div className={`${landingPageStyles.gameRecords}`}> */}
        <BingoRecord
          userImg="/static/images/gail.jpg"
          userName="Gail"
          collectedCoins={1724}
          gameImg="/static/images/bingo75.png"
          time="2022"
        />
        <Record
          userImg="/static/images/susan.jpg"
          userName="Susan"
          startCoins={10}
          collectedCoins={3036}
          gameImg="/static/images/highlow.png"
          time="2022"
        />
        <Record
          userImg="/static/images/laura.jpg"
          userName="Laura"
          startCoins={10}
          collectedCoins={3540}
          gameImg="/static/images/highlow.png"
          time="2022"
        />
      </div>
    </div>
  );
}

export default GameRecords;
