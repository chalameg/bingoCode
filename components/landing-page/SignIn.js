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

const SignIn = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUserData,
    setIsOnLandingPage,
    setIsSignupOpen,
    setLoginTime,
    setIsBgWhite,
  } = useContext(AppContext);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    setIsBgWhite(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    handle_login({ username, password });
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
    Router.push("/");
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
                <Box className={`${landingPageStyles.signInText}`}>Sign In</Box>

                <Box mb={2} fontFamily={"Inter"} borderRadius="10px">
                  <TextField
                    id="outlined-basic"
                    fullWidth={true}
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    placeholder="username"
                    size="medium"
                    className={`${landingPageStyles.email}`}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    inputProps={{ style: { fontSize: 16, color: "white" } }}
                    style={{ borderRadius: "10px" }}
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
                  {/* <FormControl sx={{ m: 0 }} variant="outlined">
                    <InputLabel
                      htmlFor="passwordLabel"
                      style={{ fontSize: "16px" }}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="passwordLabel"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl> */}
                </Box>

                <Link href="/forgot">
                  <Box mb={2}>
                    <span className={`${landingPageStyles.authForgotPassword}`}>
                      Forgot password?
                    </span>
                  </Box>
                </Link>

                <Box mb={2}>
                  <button
                    style={{ width: "-webkit-fill-available" }}
                    className={`${landingPageStyles.signInBtn}`}
                    onClick={handleLogin}
                  >
                    SIGN IN
                  </button>
                </Box>

                <div style={{ textAlign: "center", color: "white" }}>
                  <div className={`${landingPageStyles.authAccount}`}>
                    Don&apos;t have an account yet?
                  </div>
                  <Link href={"/signup"} passHref>
                    <span className={`${landingPageStyles.authBottomText}`}>
                      SIGN UP
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

export default SignIn;
