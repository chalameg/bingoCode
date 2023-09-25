import { StyleRoot } from "radium";
import animations from "../../config/animations";
import LoginForm from "./LoginForm";
import { useContext, useState } from "react";
import axiosApp from "../../common/api";
import Loader from "../common/loader/Loader";
import { AppContext } from "../../common/context";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../../common/constants";
import { handleLoginResponse } from "../../common/functions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUserData,
    setIsOnLandingPage,
    setIsSignupOpen,
    setLoginTime,
  } = useContext(AppContext);

  const handle_login = async (formData) => {
    setLoading(true);
    let response;
    try {
      // Getting access and refresh tokens
      response = await axiosApp.post("/dj-rest-auth/login/", formData);
      // console.log("response after login", response)

      localStorage.setItem(BINGO_ACCESS_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(
        BINGO_REFRESH_TOKEN_KEY,
        response.data.refresh_token
      );
      // localStorage.setItem("soundEnabled",true);
      handleLoginResponse({
        response,
        setAccessToken,
        setRefreshToken,
        setUserData,
        setIsLoggedIn,
        setIsOnLandingPage,
      });
    } catch (error) {}

    setIsLoggedIn(true);
    localStorage.setItem("loginTime", new Date());
    // setLoginTime(new Date())
    setLoading(false);
    setIsSignupOpen(false);
  };
  const errors = [];

  const handle_fb_login = async (_data) => {
    setLoading(true);
    try {
      // Getting access and refresh tokens
      const { data: tokens } = await axiosApp.post("/dj-rest-auth/facebook/", {
        access_token: _data.accessToken,
      });

      localStorage.setItem(BINGO_ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(BINGO_REFRESH_TOKEN_KEY, tokens.refresh_token);

      // Authorization and getting user data using access token
      const { data: userData } = await axiosApp.get("/dj-rest-auth/user/", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="loginTitle">Join In</div>

      <StyleRoot
        className={
          "flex flex-1 flex-column justify-center overflow-hidden padding-top mr-top"
        }
      >
        <div
          style={animations.in}
          className={"flex flex-1 flex-column justify-center"}
        >
          <div className="form-error">{errors}</div>
          <LoginForm
            onSubmit={handle_login}
            handle_fb_login={handle_fb_login}
          />
        </div>
      </StyleRoot>
    </>
  );
};
export default Login;
