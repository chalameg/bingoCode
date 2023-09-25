import { AppContext } from "./context";
import { useContext } from "react";

export const isIOS = () => {
  // return [
  //     'iPad Simulator',
  //     'iPhone Simulator',
  //     'iPod Simulator',
  //     'iPad',
  //     'iPhone',
  //     'iPod'

  //   ].includes(navigator.platform)
  //   // iPad on iOS 13 detection
  //   || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  return (
    (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i)
  );
};

export const handleLoginResponse = (handle) => {
  handle.setAccessToken(handle.response.data.access_token);
  handle.setRefreshToken(handle.response.data.refresh_token);
  handle.setUserData(
    handle.response.data?.details || handle.response.data?.user
  );
  handle.setIsLoggedIn(true);
  handle.setIsOnLandingPage(false);
};
