//import jwt_decode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import axiosApp from './axios.js';

import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../common/constants";
const connectWebSocket = (url, onmessage, setReconnecting) => {
  const token = localStorage.getItem(BINGO_ACCESS_TOKEN_KEY)
    ? "?token=" + localStorage.getItem(BINGO_ACCESS_TOKEN_KEY)
    : "";
  const scheme = "wss://";

  // var client = new W3CWebSocket(scheme + 'api.bingo12.corpberry.com' + url + token);
  const client = new W3CWebSocket(
    scheme + process.env.NEXT_PUBLIC_SERVER_URI + url + token
  );
  client.onmessage = onmessage;
  client.onopen = (event) => {
    if (setReconnecting) {
      setReconnecting(event.target.url, false);
    }
  };
  client.onclose = (event) => {
    if (setReconnecting) {
      setReconnecting(event.target.url, true);
    }
    // setTimeout(function () {
    //   connectWebSocket(url, onmessage, setReconnecting);
    // }, 100);
  };
  client.onerror = (event) => {
    console.log("error: ", event);
    //localStorage.clear();
    // window.location.reload();
    // const refreshToken = localStorage.getItem('refresh');

    // if (refreshToken !=='undefined'){
    //     try {const tokenParts = jwt_decode(refreshToken, { header: true })
    //       const now = Math.ceil(Date.now() / 1000);
    //       if (tokenParts.exp > now) {
    //         axiosApp.post('/api/token/refresh/',{refresh: refreshToken})
    //           .then((response) => {
    //             localStorage.setItem('token', response.data.access);

    //             //window.location.reload();
    //           })
    //           .catch(err => {
    //             alert(JSON.stringify(err))
    //           //   localStorage.clear()
    //           //  window.location.reload();

    //           });
    //       }else{
    //           client.close();
    //           //window.location.href = '/login/';
    //       }

    //     } catch (err) {
    //       alert(JSON.stringify(err))
    //       // localStorage.clear()
    //       // window.location.reload();

    //     }
    //     // exp date in token is expressed in seconds, while now() returns milliseconds:

    // }
  };
  // console.log(client);
  return client;
}

export default connectWebSocket;
