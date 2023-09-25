import { ArrowBack } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axiosApp from "../../common/api";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";
import { AppContext, HomeContext } from "../../common/context";
import connectWebSocket from "../../config/socket";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Loader from "../common/loader/Loader";

const Gift = ({ updatableBalance }) => {
  const { setOpenCoinsModal, setOpenWallet, openWallet } =
    useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [giftModal, setGiftModal] = useState(false);
  const [sendGiftModal, setSendGiftModal] = useState(false);
  const [sendGiftAnswer, setSendGiftAnswer] = useState(false);
  const [bingoGift, setBingoGift] = useState(false);
  const [bingoAnswer, setBingoAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friendLoading, setFriendLoading] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [friendName, setFriendName] = useState("");
  const [user, setUser] = useState({});
  const [choosen, setchoosen] = useState(false);
  const [coinResponse, setCoinResponse] = useState([]);
  const changeState = useContext(HomeContext);
  const [error, setError] = useState({
    amount: false,
    name: false,
    requestBalance: false,
    requestAmount: false,
    giftAmount: false,
  });

  useEffect(async () => {
    await axiosApp
      .get("/api/coin/transfer/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            BINGO_ACCESS_TOKEN_KEY
          )}`,
        },
      })
      .then((res) => {
        console.log("Notification c", res.data);
        if (res.data.length > 0) {
          if (!res.data[0].viewed_by_receiver) {
            setCoinResponse(res.data);
            setSendGiftAnswer(true);
          }
        }
      });
  }, []);

  useEffect(() => {
    setFriendLoading(true);
    const onmessage = (message) => {
      const data = JSON.parse(message?.data);
      setUsers(data.users);
      console.log("Notification", data.users);
      setFriendLoading(false);
    };
    const client = connectWebSocket("/ws/search/users/", onmessage);
    client.onerror = (error) => console.log("onError", error);
    client.onopen = (e) => {
      client.send(JSON.stringify({ username: friendName }));
    };
    return () => {
      client.close();
    };
  }, [friendName]);

  const collectCoin = async () => {
    await axiosApp
      .put(
        "/api/coin/transfer/update_view/",
        { coin_transfer_id: [coinResponse[0].id] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              BINGO_ACCESS_TOKEN_KEY
            )}`,
          },
        }
      )
      .then((res) => {
        console.log("Notification", res.status);
      });
  };

  const UsersView = (usersArray) => {
    const content = usersArray.usersArray
      .filter((user) => {
        const searchValue = friendName.toLowerCase();
        let username = user.username.toLowerCase();
        return searchValue && username.startsWith(searchValue) && !choosen;
      })
      .map((user) => (
        <div
          className={`${landingPageStyles.friend}`}
          key={user.id}
          onClick={() => handleUserClick(user)}
        >
          {!user.avatar && <img src="/static/images/profile.png" />}
          {user.avatar && (
            <img
              src={`https://${
                process.env.NEXT_PUBLIC_SERVER_URI + user.avatar
              }`}
            />
          )}
          <p className={`${landingPageStyles.friendName}`}>{user.username}</p>
        </div>
      ));
    return content;
  };

  const handleUserClick = (user) => {
    setchoosen(true);
    setError({ ...error, name: false });
    setUser(user);
    setFriendName(user.username);
  };

  const handleFriendName = (e) => {
    setFriendName(e.target.value);
  };

  const handleSendGift = async () => {
    if (Object.keys(user).length === 0) {
      setError({ ...error, name: true });
      return;
    }
    if (giftAmount.length === 0) {
      setError({ ...error, amount: true });
      return;
    }

    if (giftAmount < 0) {
      setError({ ...error, giftAmount: true });
      return;
    }

    setError({ ...error, name: false, amount: false, giftAmount: false });
    setLoading(true);
    const data = { amount: giftAmount, receiver_user_id: user.user_id };
    try {
      await axiosApp
        .post("/api/coin/transfer/", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              BINGO_ACCESS_TOKEN_KEY
            )}`,
          },
        })
        .then((res) => {
          console.log(res);
          changeState();
        });
    } catch (err) {
      console.log(err);
    }
    setSendGiftModal(false);
    setLoading(false);
  };

  const handleRequestCoin = async (data) => {
    if (requestAmount === "") {
      setError({ ...error, requestAmount: true });
      return;
    }

    if (requestAmount < 1) {
      setError({ ...error, requestBalance: true });
      return;
    }
    setError({ ...error, requestAmount: false, requestBalance: false });
    setLoading(true);
    try {
      await axiosApp
        .post("/api/coin/request_coins/", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              BINGO_ACCESS_TOKEN_KEY
            )}`,
          },
        })
        .then((res) => {
          console.log(res);
          changeState();
        });
    } catch (err) {}
    setLoading(false);
    setBingoGift(false);
    setBingoAnswer(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ position: "relative" }}>
      {/* <button
        className={`${landingPageStyles.giftsBtn}`}
        onClick={() => setGiftModal(true)}
      >
        Gifts */}
      <img
        src="/static/images/wallet-blue.svg"
        className={`${landingPageStyles.profileImages}`}
        alt="options"
        onClick={() => setGiftModal(true)}
      />
      {/* </button> */}
      <Modal
        open={giftModal || openWallet}
        onClose={() => setGiftModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`${landingPageStyles.giftModalContainer}`}>
          <Box
            className={`${landingPageStyles.giftModal}`}
            sx={{ background: "white" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box gap="10px" display="flex" alignItems="center">
                <img
                  src="/static/images/historyIcon.svg"
                  width="26px"
                  height="26px"
                  alt="history"
                />
                <Box fontFamily="Poppins" fontSize="18px" color="black">
                  View History
                </Box>
              </Box>
              <img
                src="/static/images/cross.svg"
                width="18px"
                height="17px"
                onClick={() => setGiftModal(false)}
                style={{ cursor: "pointer" }}
                alt="cross"
              />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="-webkit-fill-available"
            >
              <Box
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
              >
                <Box
                  color="#AAAAAA"
                  fontFamily="Inter"
                  fontSize="20px"
                  fontWeight="600"
                  lineHeight="24px"
                >
                  My Balance:
                </Box>
                <Box color="black" display="flex" alignItems="end">
                  <span
                    style={{
                      fontSize: "28px",
                      fontFamily: "Inter",
                      fontWeight: "800",
                      lineHeight: "34px",
                    }}
                  >
                    {updatableBalance}
                  </span>
                  <img
                    src="/static/images/yellowCoin.png"
                    style={{
                      height: "34px",
                      width: "34px",
                    }}
                    alt="coin"
                  />
                </Box>
              </Box>
              <button
                className={`${landingPageStyles.getCoinsBtn}`}
                style={{ width: "330px" }}
                onClick={() => {
                  setOpenCoinsModal(true);
                  setGiftModal(false);
                  setOpenWallet(false);
                }}
              >
                Get Coins
              </button>

              <button
                className={`${landingPageStyles.getCoinsBtn}`}
                style={{ width: "330px" }}
                onClick={() => {
                  setGiftModal(false);
                  setBingoGift(true);
                  setOpenWallet(false);
                }}
              >
                <img
                  src="/static/images/addGiftIcon.svg"
                  style={{
                    height: "26px",
                    width: "26px",
                    marginRight: "10px",
                  }}
                  alt="add gift"
                />
                Ask for gift from Bingo12
              </button>

              <button
                className={`${landingPageStyles.giftsBtn}`}
                style={{ width: "330px" }}
                onClick={() => {
                  setGiftModal(false);
                  setSendGiftModal(true);
                  setOpenWallet(false);
                }}
              >
                <img
                  src="/static/images/sendGiftIcon.svg"
                  style={{
                    height: "26px",
                    width: "26px",
                    marginRight: "10px",
                  }}
                  alt="send gift"
                />
                Send gift to a friend
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={sendGiftModal}
        onClose={() => setSendGiftModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`${landingPageStyles.giftModal}`}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <ArrowBack
              fontSize="small"
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setSendGiftModal(false);
                setGiftModal(true);
              }}
            />
            <Box fontSize="30px" fontWeight="700" color="black">
              Send gift
            </Box>
            <img
              src="/static/images/cross.svg"
              alt="cross"
              style={{ cursor: "pointer" }}
              onClick={() => setSendGiftModal(false)}
            />
          </Box>

          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <p className={landingPageStyles.giftModalTitle}>
              Choose whom you want to send a gift
            </p>
            {!choosen ? (
              <>
                <input
                  type="text"
                  placeholder="Enter friend's nickname"
                  className={landingPageStyles.giftModalInput}
                  onChange={handleFriendName}
                  value={friendName}
                />
                {error.name && (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    please select friend
                  </p>
                )}
              </>
            ) : (
              <div className={`${landingPageStyles.choosen}`} key={user.id}>
                {!user.avatar && <img src="/static/images/profile.png" />}
                {user.avatar && (
                  <img
                    src={`https://${
                      process.env.NEXT_PUBLIC_SERVER_URI + user.avatar
                    }`}
                  />
                )}
                <p className={`${landingPageStyles.friendName}`}>
                  {user.username}
                </p>
                <span
                  onClick={() => {
                    setchoosen(false);
                    setUser({});
                  }}
                >
                  &times;
                </span>
              </div>
            )}
            <div className={`${landingPageStyles.friendsList}`}>
              {friendLoading ? (
                <Loader style={{ height: "30%" }} />
              ) : (
                <UsersView usersArray={users} />
              )}
            </div>
            <p className={landingPageStyles.giftModalTitle}>
              How many coins you want to gift?
            </p>
            <div style={{ position: "relative" }}>
              <img
                src="/static/images/coin1.svg"
                height="27px"
                width="27px"
                alt="coins"
                style={{ position: "absolute", top: "37%", right: "18px" }}
              />
              <input
                type="number"
                placeholder="Enter the amount"
                className={landingPageStyles.giftModalInput}
                style={{ paddingRight: "80px", width: "100%" }}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    setError({ ...error, amount: false });
                  } else if (giftAmount > 0) {
                    setError({ ...error, giftAmount: false });
                  }
                  setGiftAmount(event.target.value);
                }}
                value={giftAmount}
              />
              {error.amount && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  please enter amount
                </p>
              )}
              {error.giftAmount && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  amount must greater than 0
                </p>
              )}
            </div>
            <button
              className={`${landingPageStyles.giftsBtn}`}
              onClick={handleSendGift}
            >
              SEND GIFT
            </button>
          </Box>
        </Box>
      </Modal>
      <Modal open={sendGiftAnswer} onClose={() => setSendGiftAnswer(false)}>
        <Box className={`${landingPageStyles.giftModal}`}>
          <div className={`${landingPageStyles.answerModal}`}>
            {coinResponse.length > 0 && (
              <>
                {coinResponse[0].is_sender_admin ? (
                  <img src="/static/images/logo.png" height="50px" />
                ) : (
                  <>
                    {coinResponse[0].sender_user.user.avatar ? (
                      <img
                        height="50px"
                        width="50px"
                        src={`https://${
                          process.env.NEXT_PUBLIC_SERVER_URI +
                          coinResponse[0].sender_user.user.avatar
                        }`}
                      />
                    ) : (
                      <img
                        height="50px"
                        width="50px"
                        src="/static/images/profile.png"
                      />
                    )}
                  </>
                )}
                <p
                  className={landingPageStyles.giftModalTitle}
                  style={{
                    fontWeight: "normal",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    {coinResponse[0].is_sender_admin
                      ? "Bingo12"
                      : coinResponse[0].sender_user.user.username}
                  </span>
                  send you
                  {` ${coinResponse[0].amount} `}
                  <img
                    src="/static/images/coins.png"
                    height="20px"
                    width="20px"
                    alt="coins"
                  />
                  as a gift!
                </p>
                <p
                  className={landingPageStyles.giftModalTitle}
                  style={{ textAlign: "center", fontWeight: "normal" }}
                >
                  Good luck!
                </p>
                <button
                  className={`${landingPageStyles.getCoinsBtn}`}
                  onClick={() => {
                    collectCoin();
                    setSendGiftAnswer(false);
                  }}
                >
                  Collect
                </button>
              </>
            )}
          </div>
        </Box>
      </Modal>
      <Modal
        open={bingoGift}
        onClose={() => setBingoGift(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`${landingPageStyles.giftModal}`}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <ArrowBack
              fontSize="small"
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setBingoGift(false);
                setGiftModal(true);
              }}
            />
            <Box fontSize="30px" fontWeight="700" color="black">
              Ask for gift
            </Box>
            <img
              src="/static/images/cross.svg"
              alt="cross"
              style={{ cursor: "pointer" }}
              onClick={() => setBingoGift(false)}
            />
          </Box>

          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box textAlign="center" my={4}>
              <img
                src="/static/images/gift.svg"
                height="93px"
                width="93px"
                alt="gift"
              />
            </Box>
            <Box
              textAlign="center"
              marginTop="10px"
              fontSize="18px"
              color="black"
            >
              We love giving gifts,
            </Box>
            <Box
              textAlign="center"
              marginTop="10px"
              fontSize="18px"
              color="black"
            >
              but we can&apos;t give all the time
            </Box>
            <p
              className={landingPageStyles.giftModalTitle}
              style={{ marginTop: "45px", fontWeight: "600" }}
            >
              How many coins you want as a gift?
            </p>
            <div style={{ position: "relative" }}>
              <img
                src="/static/images/coin1.svg"
                height="27px"
                width="27px"
                alt="coins"
                style={{ position: "absolute", top: "38%", right: "18px" }}
              />
              <input
                type="number"
                placeholder="Enter the amount"
                className={landingPageStyles.giftModalInput}
                style={{ paddingRight: "80px" }}
                value={requestAmount}
                onChange={(event) => {
                  setRequestAmount(event.target.value);
                  if (requestAmount !== "") {
                    setError({ ...error, requestAmount: false });
                  } else if (requestAmount > 0) {
                    setError({ ...error, requestBalance: false });
                  }
                }}
              />
              {error.requestAmount && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  please enter amount
                </p>
              )}
              {error.requestBalance && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  amount must greater than 0
                </p>
              )}
            </div>
            <button
              className={`${landingPageStyles.getCoinsBtn}`}
              onClick={() => handleRequestCoin({ amount: requestAmount })}
            >
              <img
                src="/static/images/addGiftIcon.svg"
                style={{
                  height: "26px",
                  width: "26px",
                  marginRight: "10px",
                }}
                alt="add gift"
              />
              Ask for gift from Bingo12
            </button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={bingoAnswer}
        onClose={() => setBingoAnswer(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box className={`${landingPageStyles.giftAnswerModal}`}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <ArrowBack
                fontSize="small"
                sx={{ color: "black", cursor: "pointer" }}
                onClick={() => {
                  setBingoAnswer(false);
                  setBingoGift(true);
                }}
              />

              <img
                src="/static/images/cross.svg"
                alt="cross"
                width="15px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setBingoAnswer(false);
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" height="100%">
              <Box flex="1">
                <p
                  className={landingPageStyles.giftModalTitle}
                  style={{ textAlign: "center" }}
                >
                  Your Request will be review and
                </p>
                <p
                  className={landingPageStyles.giftModalTitle}
                  style={{ textAlign: "center" }}
                >
                  answered as soon as possible
                </p>
              </Box>
              <button
                onClick={() => {
                  setBingoAnswer(false);
                }}
              >
                OK
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Gift;
