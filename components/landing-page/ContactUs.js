import { Box } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";
import test from "../../styles/test.module.scss";
import Footer from "../footer/Footer";

function ContactUs() {
  const { setIsBgWhite } = useContext(AppContext);

  useEffect(() => {
    setIsBgWhite(true);
  }, []);

  return (
    <div className="aboutus">
      <div className={`${landingPageStyles.aboutUsheader}`}>
        <Link href="/">
          <a>
            <img
              src="/static/images/bingo-logo.jfif"
              className={`${landingPageStyles.logo}`}
            ></img>
          </a>
        </Link>
      </div>
      <div style={{ height: "75vh" }} className={`${test.paragraph}`}>
        <Box
          fontSize="32px"
          lineHeight="39px"
          textAlign="center"
          fontWeight="bold"
          marginTop="-4vh"
          mb={4}
        >
          Contact Us
        </Box>
        <p
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "14vh" }}
        >
          {" "}
          Email us to balabingo12@gmail.com{" "}
        </p>
        {/* <ul>
            <li>
            <p>BINGO12&nbsp;offer Social &nbsp;games &nbsp;that simulate real money&nbsp;games but do not offer prizes of monetary value.</p>
            </li>
            <li>
            <p>BINGO12&nbsp;intended for an adult audience (21+)&nbsp;</p>
            </li>
            <li>
            <p>BINGO12 resereve the right to delete account of user who disrecpect otheres on the chat or from any other reason&nbsp;</p>
            </li>
          </ul> */}
      </div>

      <Footer className="aboutUsFooter" />
    </div>
  );
}

export default ContactUs;
