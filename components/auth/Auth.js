import { useContext, useState } from "react";
import Footer from "../footer/Footer";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import axiosApp from "../../common/api";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";
import { AppContext } from "../../common/context";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../../common/constants";
import { handleLoginResponse } from "../../common/functions";
import { authContainer } from "../../styles/auth.module.scss";

const Auth = () => {
  const [component, setComponent] = useState("login");
  const { setIsLoggedIn, setAccessToken, setRefreshToken, setUserData, setIsOnLandingPage, setLoginTime} =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const changeLayout = (next) => {
    setComponent(next);
  };
  const renderLayoutComponent = () => {
    switch (component) {
      case "welcome":
        return <Welcome changeLayout={changeLayout} />;
      case "login":
        return (
          <Login
            handleLogin={handle_login}
            errors={[]}
            changeLayout={changeLayout}
          />
        );
      case "register":
        return (
          <Register
            handleRegister={handle_signup}
            errors={[]}
            changeLayout={changeLayout}
          />
        );
      default:
        return null;
    }
  };

  const handle_login = async (formData) => {
    setLoading(true);
    let response;
    try {
      // Getting access and refresh tokens
      response = await axiosApp.post("/dj-rest-auth/login/", formData);
      
      localStorage.setItem(BINGO_ACCESS_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(
        BINGO_REFRESH_TOKEN_KEY,
        response.data.refresh_token
      );
      handleLoginResponse({
        response,
        setAccessToken,
        setRefreshToken,
        setUserData,
        setIsLoggedIn,
        setIsOnLandingPage
      });
    } catch (error) {}
    
    setLoading(false);
  };

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

  const handle_signup = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const res = await axiosApp.post("/dj-rest-auth/registration/", data);

      await Swal.fire({
        title: "Validation email sent!",
        text: " Please check your spam folder",
        icon: "success",
      });

      console.log(res.data.detail);
    } catch (error) {}
    setLoading(false);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={`flex flex-1 flex-column ${authContainer}`}>
      <div className="flex align-center justify-center">
        <button
          onClick={() => changeLayout("login")}
          className={`${component === "login" ? "active" : "inactive"} flippingBtn`}
        >
          Sign in
        </button>
        <button
          onClick={() => changeLayout("register")}
          className={`${component === "register" ? "active" : "inactive"} flippingBtn`}
        >
          Sign Up
        </button>
      </div>
      <div style={{textAlign:"center", fontSize:"18px", color:"#fff", padding:"10px"}}>
        Play live BINGO for free
      </div>
      <div className={"flex-1 flex flex-column"}>{renderLayoutComponent()}</div>
      {/* <Footer /> */}
    </div>
  );
};
export default Auth;
