import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
} from "react";
import {
  chatContainer,
  chatInnerContainer,
  chatMessage,
  chatMessageContainer,
  chatMessagesContainer,
  chatUser,
  chatTime,
  singleChat,
  ownerMessageContainer,
  chatForm,
} from "../../styles/bingo90/home.module.scss";
import { FiSend } from "react-icons/fi";
import { BsEmojiLaughing } from "react-icons/bs";
import connectWebSocket from "../../config/socket";
import axiosApp from "../../common/api";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";
import { AppContext, HomeContext } from "../../common/context";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

function Chat() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatsEndRef = useRef(null);
  const chatFormEndRef = useRef(null);
  const [chatRefreshTime, setChatRefreshTime] = useState("");
  const { setAvailableChats } = useContext(AppContext);
  const { messageData } = useContext(HomeContext);
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);

  const inputRef = createRef();
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const pickEmoji = ({ emoji }, event) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const msg = start + emoji + end;
    setMessage(msg);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    if (messageData.type === "new" || messageData.type === "scheduled") {
      setChatRefreshTime(new Date());
    }
  }, [messageData]);

  const getChats = async () => {
    await axiosApp
      .get("/api/chat/history/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            BINGO_ACCESS_TOKEN_KEY
          )}`,
        },
      })
      .then((res) => {
        if (res.data.results.length > 0) {
          const filteredChats = res.data.results.filter((val) => {
            let crt = localStorage.getItem("CRT");
            return new Date(crt) < new Date(val.timestamp);
          });
          setChats(filteredChats.reverse());

          setAvailableChats(chats);
        }
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // getChats();
    }, 4000);
    return () => clearTimeout(timer);
  }, [chats, message]);

  const onGameMessageReceived = (message) => {
    const jsonData = JSON.parse(message.data);
    console.log("messages: " + JSON.stringify(jsonData));
  };

  const sendMessage = () => {
    if (message.length > 1) {
      const client = connectWebSocket("/ws/chat/", (message) => {
        onGameMessageReceived(message);
      });

      client.onopen = () => {
        const res = client.send(JSON.stringify({ message: message }));
        getChats();
      };

      setMessage("");

      return () => {
        client.close();
      };
    } else {
      return setIsMessageEmpty(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    chatsEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    const timer = setTimeout(() => {
      chatFormEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 1000);
    return () => clearTimeout(timer);
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);

    const timer = setTimeout(() => {
      scrollToBottom();
    }, 300);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, message]);

  return (
    <div className={`${chatContainer}`}>
  
      <div className={`${chatInnerContainer}`}>
        <div className={`${chatMessagesContainer}`}>
          {chats.map((chat) => {
            if (chat.is_me) {
              return (
                <div
                  style={{
                    marginBottom: "15px",
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  <div className={`block ${ownerMessageContainer}`}>
                    <div className={`${chatMessage}`}>{chat.message}</div>
                    <div className={`${chatTime}`}>
                      {chat.timestamp.slice(12, 16)}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={`${singleChat} flex align-center `}>
                  {chat.sender_user?.user.avatar ? (
                    <img
                      src={`https://${
                        process.env.NEXT_PUBLIC_SERVER_URI +
                        chat.sender_user?.user.avatar
                      }`}
                      alt="pro"
                      height={34}
                      width={34}
                    />
                  ) : (
                    <img
                      alt={`avatar`}
                      height={34}
                      width={34}
                      src={"/static/images/profile.png"}
                    />
                  )}

                  <div className={`block ${chatMessageContainer}`}>
                    <div className={`${chatUser}`}>
                      {chat.sender_user?.user.username}
                    </div>
                    <div className={`${chatMessage}`}>{chat.message}</div>
                    <div className={`${chatTime}`}>
                      {chat.timestamp.slice(12, 16)}
                    </div>
                  </div>
                </div>
              );
            }
          })}

          <div ref={chatsEndRef}></div>
        </div>
        <form className={`${chatForm} block`}>
          {showEmojis ? (
            <div>
              <EmojiPicker onEmojiClick={pickEmoji} height={100} width={280} />
            </div>
          ) : (
            <></>
          )}
          
          <div className="flex onmobile-device">
            <input
              placeholder="Type a message"
              style={{ width: "90%", borderRadius: "25px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
            <BsEmojiLaughing
              style={{ marginLeft: "10px" }}
              onClick={handleShowEmojis}
              color="#FF6D3F "
            />
            <button
              type="button"
              style={{ padding: "5px 8px 0 6px" }}
              className="orangeButton btn-chat"
              onClick={sendMessage}
            >
              <FiSend />
            </button>
          </div>
          <div ref={chatFormEndRef}></div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
