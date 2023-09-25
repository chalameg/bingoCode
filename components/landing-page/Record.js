import React from "react";
import landingPageStyles from "../../styles/landingPage.module.scss";

function Record({
  userImg,
  userName,
  startCoins,
  collectedCoins,
  gameImg,
  time,
}) {
  return (
    <div className={`${landingPageStyles.recordItem}`}>
      <img
        className={`${landingPageStyles.recordUserImg}`}
        src={userImg}
        height="48px"
        width="48px"
        style={{ borderRadius: "50%", margin: "5px 0" }}
      />
      <div className="block ml-10">
        <h5 className={`${landingPageStyles.recordUsername} mb-5`}>
          {userName}
        </h5>
        <div className="flex" style={{ alignItems: "center" }}>
          <span
            className={`${landingPageStyles.recordSubtitle}`}
            style={{
              fontSize: "12px",
              marginRight: "5px",
              fontWeight: "normal",
            }}
          >
            Started with
          </span>
          <span
            className={`${landingPageStyles.recordSubtitle}`}
            style={{ fontSize: "12px", marginRight: "0", fontWeight: "normal" }}
          >
            {startCoins}
          </span>
          <img
            className={`${landingPageStyles.recordSubtitleImg}`}
            src="/static/images/yellowCoin.png"
            height="20px"
            width="20px"
          ></img>
        </div>

        <div className="flex" style={{ alignItems: "center" }}>
          <span
            className={`${landingPageStyles.recordSubtitle}`}
            style={{
              fontSize: "12px",
              marginRight: "5px",
              fontWeight: "normal",
            }}
          >
            Collected
          </span>
          <span
            className={`${landingPageStyles.recordSubtitle}`}
            style={{ fontSize: "12px", marginRight: "0", fontWeight: "normal" }}
          >
            {collectedCoins}
          </span>
          <img
            className={`${landingPageStyles.recordSubtitleImg}`}
            src="/static/images/yellowCoin.png"
            height="20px"
            width="20px"
          ></img>
        </div>
        <small
          className={`${landingPageStyles.pcTime}`}
          style={{
            fontSize: "12px",
            marginRight: "10px",
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          {time}
        </small>
      </div>
      <div className={`${landingPageStyles.timeGameImg}`}>
        <small
          className={`${landingPageStyles.mobileTime}`}
          style={{ fontSize: "12px", marginRight: "10px", fontWeight: "400" }}
        >
          {time}
        </small>
        <img src={gameImg} height="48px" width="48px" />
      </div>
    </div>
  );
}

export default Record;
