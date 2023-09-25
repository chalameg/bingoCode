import React, { useState } from "react";
import { StyleRoot } from "radium";
import animations from "../../config/animations";
import landingPageStyles from "../../styles/landingPage.module.scss";
import Link from "next/link";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/material";

const WelcomeBingo = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyleRoot
      className={`flex flex-column justify-center overflow-hidden ${landingPageStyles.welcomeStyleContainer}`}
    >
      <div
        style={animations.in}
        className={`${landingPageStyles.welcomeContainer}`}
      >
        <span
          className={`${landingPageStyles.welcome}`}
          style={{
            fontWeight: 700,
            lineHeight: "96px",
            textAlign: "center",
            color: "white",
          }}
        >
          Welcome
        </span>

        <div>
          <Box px="10px">
            <div className={`${landingPageStyles.btnContainer}`}>
              <Link href="/signup">
                <button className={`${landingPageStyles.signUpBtn}`}>
                  SIGN UP
                </button>
              </Link>

              <button
                className={`${landingPageStyles.contactUsBtn}`}
                onClick={() => setOpen(!open)}
              >
                <img
                  src="/static/images/contact-blue.svg"
                  width={20}
                  height={20}
                  alt="Contact"
                  style={{ marginRight: "5px", color: "#7F5AEF" }}
                />
                CONTACT US
              </button>
            </div>
            {open && (
              <div className={`${landingPageStyles.contactItemsMobile}`}>
                <div style={{ textAlign: "end", marginRight: "3px" }}>
                  <Close
                    fontSize="small"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      opacity: "0.3",
                      color: "black",
                    }}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div
                  className={`${landingPageStyles.contactImg}`}
                  // style={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  //   gap: "10px",
                  //   cursor: "pointer",
                  // }}
                >
                  <a
                    href="https://api.whatsapp.com/send/?phone=37258940469&text=&source=&data="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/static/images/whatsapp.svg"
                      alt="WhatsApp"
                      // style={{ width: "30px" }}
                    />
                  </a>
                  <a
                    href="https://t.me/bingo12u"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/static/images/telegram.svg"
                      alt="telegram"
                      // style={{ width: "30px" }}
                    />
                  </a>
                  {/* <img
                    src="/static/images/sms.svg"
                    alt="sms"
                    style={{ width: "30px" }}
                  />
                  <img
                    src="/static/images/line.svg"
                    alt="line"
                    style={{ width: "30px" }}
                  /> */}
                </div>
              </div>
            )}
          </Box>

          <div className={`${landingPageStyles.signUpContainer}`}>
            <Link href="/signup">
              <button className={`${landingPageStyles.signUpBtn}`}>
                SIGN UP
              </button>
            </Link>
          </div>

          <div className={`${landingPageStyles.accountContainer}`}>
            <p className={`${landingPageStyles.account}`}>
              Already have an account?
            </p>
            <Link href="/signin">
              <p className={`${landingPageStyles.accountSignIn}`}>SIGN IN</p>
            </Link>
          </div>

          {/* desktop */}

          <div>
            <Box className={`${landingPageStyles.contactUsContainer}`} pb={1}>
              <button
                className={`${landingPageStyles.contactUsBtn}`}
                onClick={() => setOpen(!open)}
              >
                <img
                  src="/static/images/contact-blue.svg"
                  width={20}
                  height={20}
                  alt="Contact"
                  style={{ marginRight: "5px" }}
                />
                CONTACT US
              </button>
            </Box>
            {open && (
              <div
                className={`${landingPageStyles.contactItems}`}
                style={{
                  position: "relative",
                  width: "150px",
                  // width: "257px",
                  backgroundColor: "white",
                  zIndex: 1001,
                  // paddingTop: "2%",
                  borderRadius: "10px",
                  margin: "10px auto auto auto",
                }}
              >
                <div style={{ textAlign: "end", marginRight: "3px" }}>
                  <Close
                    fontSize="small"
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      opacity: "0.3",
                      color: "black",
                    }}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    cursor: "pointer",
                    paddingBottom: "10px",
                  }}
                >
                  <a
                    href="https://api.whatsapp.com/send/?phone=37258940469&text=&source=&data="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/static/images/whatsapp.svg" alt="WhatsApp" />
                  </a>

                  <a
                    href="https://t.me/bingo12u"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/static/images/telegram.svg" alt="telegram" />
                  </a>
                  {/* <img src="/static/images/sms.svg" alt="sms" />
                  <img src="/static/images/line.svg" alt="line" /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyleRoot>
  );
};

export default WelcomeBingo;
