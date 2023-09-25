import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";
import BlogCard from "../blog/BlogCard";
import Footer from "../footer/Footer";
import Header from "./Header";

const Blog = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setIsOnLandingPage,
    isSignupOpen,
    setIsSignupOpen,
    setIsBgWhite,
  } = useContext(AppContext);

  const toggleForm = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  useEffect(() => {
    setIsBgWhite(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(BINGO_ACCESS_TOKEN_KEY);
    localStorage.removeItem(BINGO_REFRESH_TOKEN_KEY);
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    setIsOnLandingPage(true);
  };

  return (
    <div className={`${landingPageStyles.landingPage}`} id="landingpage">
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className={`${
          // isLoggedIn
          //   ? landingPageStyles.profileLandingPageTop
          //   : isSignupOpen
          landingPageStyles.landingPageTop
          // : landingPageStyles.minLandingPageTop
        } ${landingPageStyles.bgGradient}`}
      >
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isSignUpOpen={isSignupOpen}
          toggleForm={toggleForm}
        />

        <Box>
          <Box
            fontFamily="Poppins"
            fontSize="64px"
            textAlign="center"
            fontWeight="700"
            color="white"
            lineHeight="96px"
            mb={4}
            sx={{ textShadow: "0px 2px 12px rgba(0, 0, 0, 0.25)" }}
          >
            Blog
          </Box>
          <Box className={`${landingPageStyles.blogContainer}`}>
            <BlogCard
              image="/static/images/blog1.svg"
              title="Article Title"
              description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  at commodo sem. Cras et est lacus."
            />
            <BlogCard
              image="/static/images/blog2.svg"
              title="Article Title"
              description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  at commodo sem. Cras et est lacus."
            />
            <BlogCard
              image="/static/images/blog3.svg"
              title="Article Title"
              description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  at commodo sem. Cras et est lacus."
            />
          </Box>
        </Box>
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
