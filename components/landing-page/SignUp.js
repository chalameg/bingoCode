import { Box, TextField } from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import { StyleRoot } from "radium";
import { useContext, useEffect, useState } from "react";
import axiosApp from "../../common/api";
import {
  BINGO_ACCESS_TOKEN_KEY,
  BINGO_REFRESH_TOKEN_KEY,
} from "../../common/constants";
import { AppContext } from "../../common/context";
import { handleLoginResponse } from "../../common/functions";
import animations from "../../config/animations";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Loader from "../common/loader/Loader";
import Footer from "../footer/Footer";
import Header from "./Header";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoggedIn } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const {
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUserData,
    setIsOnLandingPage,
    setIsBgWhite,
  } = useContext(AppContext);

  useEffect(() => {
    setIsBgWhite(false);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    handle_signup({
      username,
      email,
      password1: password,
      password2: confirmPassword,
    });
  };

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
      Router.push("/signin");

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

  return (
    <div className={`${landingPageStyles.bgGradient}`}>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header isLoggedIn={isLoggedIn} />

            <StyleRoot className={`${landingPageStyles.signInTopContainer}`}>
              <div
                style={animations.in}
                className={`${landingPageStyles.signInContainer}`}
              >
                <Box
                  mb={4}
                  fontSize={"64px"}
                  color={"white"}
                  fontFamily={"Poppins"}
                >
                  Sign Up
                </Box>

                <Box mb={2} fontFamily={"Inter"}>
                  <TextField
                    id="outlined-basic"
                    fullWidth={true}
                    label="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    placeholder="Enter your nickname"
                    size="medium"
                    className={`${landingPageStyles.email}`}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    inputProps={{ style: { fontSize: 16, color: "white" } }}
                  />
                </Box>

                <Box mb={2} fontFamily={"Inter"}>
                  <TextField
                    id="outlined-basic"
                    fullWidth={true}
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    placeholder="email@gmail.com"
                    size="medium"
                    className={`${landingPageStyles.email}`}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    inputProps={{ style: { fontSize: 16, color: "white" } }}
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    type="password"
                    fullWidth={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    variant="outlined"
                    placeholder="Enter your password"
                    size="medium"
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    inputProps={{ style: { fontSize: 16, color: "white" } }}
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    type="password"
                    fullWidth={true}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm password"
                    variant="outlined"
                    placeholder="Confirm your password"
                    size="medium"
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    inputProps={{ style: { fontSize: 16, color: "white" } }}
                  />
                </Box>

                <Box mb={2}>
                  <button
                    style={{ width: "-webkit-fill-available" }}
                    className={`${landingPageStyles.signInBtn}`}
                    onClick={handleRegister}
                  >
                    SIGN UP
                  </button>
                </Box>

                <div style={{ textAlign: "center", color: "white" }}>
                  <div className={`${landingPageStyles.authAccount}`}>
                    Don&apos;t have an account yet?
                  </div>
                  <Link href={"/signin"} passHref>
                    <span className={`${landingPageStyles.authBottomText}`}>
                      SIGN IN
                    </span>
                  </Link>
                </div>
              </div>
            </StyleRoot>

            <Footer />
          </>
        )}
      </Box>
    </div>
  );
};

export default SignUp;
