import { Close } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, HomeContext } from "../../common/context";
import connectWebSocket from "../../config/socket";
import landingPageStyles from "../../styles/landingPage.module.scss";
import GetCoins from "./GetCoins";
import Gift from "./Gift";
import UpdateProfile from "./UpdateProfile";

function Profile({ getCoinsRef }) {
  const { userData, setUserData } = useContext(AppContext);
  const { playerBalance } = useContext(HomeContext);
  const [updatableBalance, setUpdatableBalance] = useState(playerBalance);
  const [incrementState, setIncrementState] = useState(0);
  const [open, setOpen] = useState(false);

  const changeState = useCallback(() => {
    setIncrementState(incrementState + 1);
  }, [incrementState]);

  const onPlayerMessageReceived = (message) => {
    const data = JSON.parse(message.data);
    setUpdatableBalance(parseInt(data?.credit_balance, 10));
  };
  useEffect(() => {
    const client = connectWebSocket("/ws/player/", onPlayerMessageReceived);
    return () => {
      client.close;
    };
  }, [incrementState]);

  const handle_avatar_update = (_newAvatar) => {
    setUserData({ ...userData, avatar: _newAvatar.slice(22) });
  };

  return (
    <div className={`${landingPageStyles.profile}`}>
      <div className={`${landingPageStyles.profileAndWalletConatainer}`}>
        <div className={`${landingPageStyles.center}`}>
          <UpdateProfile
            handle_avatar_update={handle_avatar_update}
          ></UpdateProfile>
        </div>
        <Box className={`${landingPageStyles.nameContainer}`}>
          <Box
            color="#fff"
            textAlign="center"
            fontFamily="Inter"
            className={`${landingPageStyles.names}`}
          >
            <span className={`${landingPageStyles.namesHello}`}>Hello, </span>
            <span className={`${landingPageStyles.bingoUserName}`}>
              {userData?.username ? userData?.username : "User"}
            </span>
          </Box>
          <div className={`${landingPageStyles.profileCardItem}`}>
            <span className={`${landingPageStyles.profileBalance}`}>
              {updatableBalance}
            </span>
            <img
              src="/static/images/yellowCoin.png"
              className={`${landingPageStyles.profileCoin}`}
              alt="coin"
            />
          </div>
        </Box>
      </div>

      <Box>
        <Box display="flex" justifyContent="center" gap="10px">
          <HomeContext.Provider value={changeState}>
            <Gift updatableBalance={updatableBalance} />
          </HomeContext.Provider>
          <GetCoins />
          <img
            src="/static/images/history-blue.svg"
            className={`${landingPageStyles.profileImages}`}
            alt="wallet"
            onClick={() => setOpen(!open)}
          />
        </Box>
        {open && (
          <div className={`${landingPageStyles.contact}`}>
            <div style={{ textAlign: "end", marginRight: "3px" }}>
              <Close
                fontSize="small"
                style={{
                  cursor: "pointer",
                  width: "20px",
                  opacity: "0.3",
                  color: "black",
                }}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className={`${landingPageStyles.contactImg}`}>
              <a
                href="https://api.whatsapp.com/send/?phone=37258940469&text=&source=&data="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/static/images/whatsapp.svg" alt="WhatsApp" />
              </a>

              <a
                href="https://t.me/bingo12u"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/static/images/telegram.svg" alt="telegram" />
              </a>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Profile;
