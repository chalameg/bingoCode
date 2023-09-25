import { w3cwebsocket as W3CWebSocket } from "websocket";

import {
  BINGO_ACCESS_TOKEN_KEY,
} from "../common/constants";

const connectWebSocket90 = (url, onmessage, setReconnecting) => {
  const token = localStorage.getItem(BINGO_ACCESS_TOKEN_KEY)
    ? "?token=" + localStorage.getItem(BINGO_ACCESS_TOKEN_KEY)
    : "";

  const scheme = "wss://";
  
  const client = new W3CWebSocket(
    scheme + process.env.NEXT_PUBLIC_SERVER_URI_BINGO90 + url + token
  );

  client.onmessage = onmessage;

  client.onopen = (event) => {
    console.log("SOCKET OPENING " + url );
    if (setReconnecting) {
      setReconnecting(event.target.url, false);
    }
  };

  client.onclose = (event) => {
    console.log("SOCKET CLOSING " + url );
    if (setReconnecting) {
      setReconnecting(event.target.url, true);
    }
  };

  client.onerror = (event) => {
    console.log("error: ", event);
    
  };
  return client;
}

export default connectWebSocket90;
