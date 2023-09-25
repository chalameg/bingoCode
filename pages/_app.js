import Script from "next/script";
import "../styles/globals.scss";
import Head from "next/head";

import { useEffect, useState } from "react";
import { handleLoginResponse, isIOS } from "../common/functions";
import { AppContext } from "../common/context";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../common/constants";
import axiosApp from "../common/api";
import ErrorBoundary from "../components/ErrorBoundary";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(false);
  const [availableChats, setAvailableChats] = useState([]);
  const [isOnLandingPage, setIsOnLandingPage] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userData, setUserData] = useState({});
  const [crowdAudio, setCrowdAudio] = useState(null);
  const [crowdWinAudio, setCrowdWinAudio] = useState(null);
  const [inBetweenAudio, setCrowdInBetweenAudio] = useState(null);
  const [isBgWhite, setIsBgWhite] = useState(false);
  const [openCoinsModal, setOpenCoinsModal] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUserData({});
    setIsLoggedIn(false);
    localStorage.removeItem(BINGO_ACCESS_TOKEN_KEY);
    localStorage.removeItem(BINGO_REFRESH_TOKEN_KEY);
    localStorage.removeItem("loginTime");
  };
  const appContextValue = {
    isLoggedIn,
    setIsLoggedIn: (value) => {
      setIsLoggedIn(value);
    },
    setAccessToken,
    setRefreshToken,
    setUserData,
    refreshToken,
    accessToken,
    userData,
    loading,
    setLoading,
    logout,
    isOnLandingPage,
    setIsOnLandingPage,
    isSignupOpen,
    setIsSignupOpen,
    loginTime,
    setLoginTime,
    availableChats,
    setAvailableChats,
    crowdAudio,
    setCrowdAudio,
    crowdWinAudio,
    setCrowdWinAudio,
    inBetweenAudio,
    setCrowdInBetweenAudio,
    isBgWhite,
    setIsBgWhite,
    openCoinsModal,
    setOpenCoinsModal,
    openWallet,
    setOpenWallet,
  };
  useEffect(() => {
    if (isIOS()) {
      /* iOS hides Safari address bar */
      window.addEventListener("load", () => {
        setTimeout(() => {
          window.scrollTo(0, 1);
        }, 10);
      });
      document.body.className += " ios";
    }

    const token = localStorage.getItem(BINGO_ACCESS_TOKEN_KEY) ?? "";
    if (token !== "") {
      setIsLoggedIn(true);
      setLoading(true);
      // Authorization and getting user data using access token
      (async () => {
        const { data } = await axiosApp.get("/dj-rest-auth/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(data);
        setLoading(false);
      })();
    }
  }, []);
  return (
    <AppContext.Provider value={appContextValue}>
      <Head>
        <title>Bingo12</title>
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, minimal-ui"
        />
        <meta name="application-name" content="Bingo 75" />
        <meta name="theme-color" content="#3B1103" />
        <meta name="msapplication-navbutton-color" content="#3B1103" />
        <meta name="msapplication-TileColor" content="#3B1103" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Bingo 75" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#3B1103" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" />
        <meta name="keywords" content="Bingo 75, Bingo, bingo" />
      </Head>
      {/* Google tag (gtag.js)  */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-206666900-1"
        strategy="afterInteractive"
      ></Script>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}

        gtag('js', new Date());

        gtag('config', 'UA-206666900-1');`,
        }}
      />

      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
        strategy="beforeInteractive"
      />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </AppContext.Provider>
  );
};

export default MyApp;
