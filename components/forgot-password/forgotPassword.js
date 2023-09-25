import { Box, TextField } from "@mui/material";
import { StyleRoot } from "radium";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/context";
import animations from "../../config/animations";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Footer from "../footer/Footer";
import Header from "../landing-page/Header";

const ForgotPassword = () => {
  const { isLoggedIn, setIsBgWhite } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsBgWhite(false);
  }, []);

  const errors = [];

  return (
    <StyleRoot>
      <div
        className={`${landingPageStyles.bgGradient}`}
        style={{ fontFamily: "Inter" }}
      >
        <Box height="100vh" display="flex" flexDirection="column">
          <Header isLoggedIn={isLoggedIn} />
          <div
            style={animations.in}
            className={`${landingPageStyles.signInTopContainer}`}
          >
            <div className={`${landingPageStyles.signInContainer}`}>
              {page === 1 && (
                <>
                  <Box mb={4} fontSize={"30px"} color={"white"}>
                    Forgot password?
                  </Box>

                  <Box
                    mb={4}
                    fontSize="16px"
                    textAlign={"center"}
                    color={"white"}
                    lineHeight={"19px"}
                  >
                    Enter your registered email below to receive password reset
                    instructions
                  </Box>

                  <Box mb={2}>
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
                    <button
                      style={{ width: "-webkit-fill-available" }}
                      className={`${landingPageStyles.signUpBtn}`}
                      onClick={() => setPage(2)}
                    >
                      SEND
                    </button>
                  </Box>
                </>
              )}

              {page === 2 && (
                <>
                  <Box mb={4} fontSize={"30px"} color={"white"}>
                    Check your mail
                  </Box>

                  <Box
                    mb={4}
                    fontSize="16px"
                    textAlign={"center"}
                    color={"white"}
                    lineHeight={"19px"}
                  >
                    Please check your inbox and click in the recieved link to
                    reset a password
                  </Box>

                  <Box mb={2}>
                    <button
                      style={{ width: "-webkit-fill-available" }}
                      className={`${landingPageStyles.signUpBtn}`}
                    >
                      RESEND
                    </button>
                  </Box>

                  <Box
                    mb={4}
                    fontSize="14px"
                    textAlign={"center"}
                    color={"white"}
                    lineHeight={"17px"}
                  >
                    <span>
                      Did not receive the email? Check your spam filter or
                    </span>
                  </Box>

                  <Box
                    mb={4}
                    fontSize="18px"
                    textAlign={"center"}
                    color={"white"}
                    lineHeight={"22px"}
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setPage(1)}
                  >
                    try another email address
                  </Box>
                </>
              )}
            </div>
          </div>
          <Footer />
        </Box>
      </div>
    </StyleRoot>
  );
};

export default ForgotPassword;
