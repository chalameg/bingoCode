import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
  useMemo,
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
  chatPlaceHolderContainer,
  chatInputContainer,
  borderlessInput,
 

} from "../../styles/home.module.scss";

import {EmojiPickerReact} from "../../styles/emoji-picker-custom.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmile} from "react-icons/bs";
import connectWebSocket from "../../config/socket";
import axiosApp from "../../common/api";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";
import InputEmoji from "react-input-emoji";
import { AppContext, HomeContext } from "../../common/context";
import Image from "next/image";
// import EmojiPicker from "emoji-picker-react";
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
  const { availableChats, setAvailableChats, loading } = useContext(AppContext);
  const { messageData } = useContext(HomeContext);
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = createRef();
  const [showEmojis, setShowEmojis] = useState(false);
  const [emojiButtonColor, setEmojiButtonColor] = useState("#999");
  const [cursorPosition, setCursorPosition] = useState();
  const [modalElements, setModalElements] = useState([]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const elements = document.getElementsByClassName('modalcontent');
      setModalElements(Array.from(elements));
    }
  }, []);
 
    
  
  const handleInputFocus = () => {
    setInputFocused(true);
    if (typeof document !== 'undefined') {
      console.log("hello input");
      modalElements.forEach((element) => {
        element.style.height = "55%";
      });
    }
  }
  
 const handleInputBlur = () => {
  //    setInputFocused(false);
  //    console.log("hello output")
   
  //  if (typeof document !== 'undefined') {
      
  //       // modalElement.style.height = "100%";
    
  //   }

  };

  const pickEmoji = ({ emoji }, event) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const msg = start + emoji + end;
    setMessage(msg);
    setCursorPosition(start.length + emoji.length);
  };

  // useEffect(() => {
  //   setChatRefreshTime(new Date())
  // },[]);

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
          // setChats(res.data.results.reverse());
          setAvailableChats(chats);
        }
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getChats();
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

  // function handleOnEnter(text) {
  //   setMessage(text);
  //   sendMessage();
  // }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = (isInputFocused) => {
    if(!isInputFocused){
    chatsEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  //  const timer = setTimeout(() => {
  //     chatFormEndRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "start",
  //     });
  //   }, 1000);
  //   return () => clearTimeout(timer);
}

  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
   setEmojiButtonColor("#FF6D3F" );

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
  }, [chats]);

  return (
   
     <div className={`${chatContainer}`}>
      {/* <div className={`${chatInnerContainer}`}> */}
      <div className={`${chatMessagesContainer}`}>
          
          {chats.map((chat) => {
            if (chat.is_me) {
              return (
                <div
                  style={{
                    marginBottom: "5px",
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
                <div className={`${singleChat} flex align-center flex-gap:5`}>
                
                  {chat.sender_user?.user.avatar ? (
                    <Image
                      src={`https://${
                        process.env.NEXT_PUBLIC_SERVER_URI +
                        chat.sender_user?.user.avatar
                      }`}
                      alt="pro"
                      height={34}
                      width={34}
                    />
                  ) : (
                    <Image
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

        <form className={`${chatForm} block`} style={{position:"sticky", position:"-webkit-sticky", bottom:0}}>
          
          {/* <InputEmoji
            className={`${isMessageEmpty ? "borderWarning" : ""}`}
            placeholder="Type a message"
            value={message}
            onChange={setMessage}
            onEnter={handleOnEnter}
            height={5}
          /> */}
          {showEmojis ? (
            // <div style={{marginTop:"80%"}}>
            <div className={`${EmojiPickerReact}`}> 
              <EmojiPicker onEmojiClick={pickEmoji} height={40} width={280} emojiStyle="native"/>
            </div>
          ) : (
            <></>
          )}
          <div className={`${chatInputContainer}`}>
          <div className={`${chatPlaceHolderContainer}`}>
            
            <input
              placeholder="Type a message"
              style={{ width: "90%", height:"20px"}}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              className={`${borderlessInput}`}
              autoFocus={false}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <BsEmojiSmile
              style={{ margin: "5px", }}
              onClick={handleShowEmojis}
              // color="#FF6D3F "
              color={emojiButtonColor}
            />
            </div>
            <button
              type="button"
              style={{ padding: "9px 11px 0px 9px" }}
              className="orangeButton btn-chat"
              onClick={sendMessage}
            >
              <RiSendPlaneFill/>
            </button>
          
          </div>
          <div ref={chatFormEndRef}></div>
        </form>
  </div>
  );
          }

export default Chat;
