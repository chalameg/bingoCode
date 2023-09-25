import { Box } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";
import test from "../../styles/test.module.scss";
import Footer from "../footer/Footer";

function About() {
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
              alt="bingo"
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
          About Us
        </Box>

        <p>
          At BINGO12 we wellcome you to participate at online bingo played in
          real time with other pepole!
        </p>

        <p>
          Our games are designed to deliver authentic bingo hall experience,
          with extra value of innovative games beside the classic Bingo75 balls.
        </p>

        <p>
          We are working on improving the existing bingo game and developing
          other well known games such as Bingo 90 balls, Mexican Bingo, among
          others.
        </p>

        <p>
          The original bingo game invented in Italy in the 1500s under the name
          Tombola. It received its well known trade mark name &quot;BINGO&quot;
          in USA. For further details, read all about&nbsp;
          <a href="https://en.wikipedia.org/wiki/Bingo_(American_version)">
            American bingo on vikipedia&nbsp;
          </a>
        </p>

        <p>
          So if you wish play bingo on desktop, mobile or any device without the
          need to download bingo app - and also play not as video slot but as
          real bingo event - we are wellcome you and here to serve your desire
          play&nbsp;bingo for fun&nbsp;
        </p>
      </div>

      <Footer className="aboutUsFooter" />
    </div>
  );
}

export default About;
