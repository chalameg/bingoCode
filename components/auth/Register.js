import { StyleRoot } from "radium";
import animations from "../../config/animations";
import RegisterForm from "./RegisterForm";
import { useContext, useState } from "react";
import axiosApp from "../../common/api";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";
import { AppContext } from "../../common/context";
import { handleLoginResponse } from "../../common/functions";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../../common/constants";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUserData,
    setIsOnLandingPage,
  } = useContext(AppContext);

  const handle_signup = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axiosApp.post("/dj-rest-auth/registration/", data);

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
      setIsLoggedIn(true);

      // await Swal.fire({
      //   title: "Validation email sent!",
      //   text: " Please check your spam folder",
      //   icon: "success",
      // });

      // setIsSignupOpen(false);
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

  const errors = [];

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <StyleRoot
        className={
          "flex flex-1 flex-column justify-center overflow-hidden padding-top mr-top"
        }
      >
        <div
          style={animations.in}
          className={"flex flex-1 flex-column justify-center"}
        >
          <RegisterForm
            errors={errors}
            onSubmit={handle_signup}
            handle_fb_login={handle_fb_login}
          />
        </div>
      </StyleRoot>
    </>
  );
};
export default Register;
