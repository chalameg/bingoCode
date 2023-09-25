import { Box, TextField } from "@mui/material";
import { StyleRoot } from "radium";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/context";
import animations from "../../config/animations";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Footer from "../footer/Footer";
import Header from "../landing-page/Header";

const ResetPassword = () => {
  const { isLoggedIn, setIsBgWhite } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <div style={{ height: "100vh" }}>
          <Header isLoggedIn={isLoggedIn} />
          <div
            style={animations.in}
            className={`${landingPageStyles.signInContainer}`}
          >
            <Box mb={4} fontSize={"30px"} color={"white"} lineHeight={"36px"}>
              Reset password
            </Box>

            <Box
              mb={4}
              fontSize="16px"
              textAlign={"center"}
              color={"white"}
              lineHeight={"19px"}
            >
              Your new password must be different from previous passwords
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
                className={`${landingPageStyles.signUpBtn}`}
              >
                Reset
              </button>
            </Box>
          </div>
          <Footer />
        </div>
      </div>
    </StyleRoot>
  );
};

export default ResetPassword;
