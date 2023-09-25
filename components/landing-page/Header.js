import { Check, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import landingPageStyles from "../../styles/landingPage.module.scss";

function Header({ isLoggedIn, handleLogout }) {
  const [show, setShow] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("English");

  const languages = ["English", "Українська", "ภาษาไทย"];

  return (
    <div className={`${landingPageStyles.landingPageHeader}`}>
      <div className={`${landingPageStyles.headerLeft}`}>
        <Link href="/">
          <a>
            <img
              src="/static/images/bingo-logo.jfif"
              className={`${landingPageStyles.logo}`}
            ></img>
          </a>
        </Link>
      </div>

      <div className={`${landingPageStyles.langTopContainer}`}>
        <img src="/static/images/language.svg" />
        <span
          className="flex align-center"
          style={{ cursor: "pointer" }}
          onClick={() => setShow(!show)}
        >
          <span>{activeLanguage}</span>
          {show ? (
            <KeyboardArrowUp fontSize="small" />
          ) : (
            <KeyboardArrowDown fontSize="small" />
          )}
        </span>
        {isLoggedIn && (
          <img
            src="/static/images/logout.svg"
            style={{ cursor: "pointer" }}
            alt="logout"
            onClick={() => handleLogout()}
          />
        )}
        {show && (
          <div className={`${landingPageStyles.langContainer}`}>
            {languages.map((lang, index) => (
              <div
                className={`${
                  activeLanguage === lang
                    ? landingPageStyles.langItemActive
                    : landingPageStyles.langItem
                }`}
                key={index}
              >
                {activeLanguage === lang ? (
                  <>
                    <Check style={{ fontSize: "15px", marginRight: "5px" }} />
                    <span>{lang}</span>
                  </>
                ) : (
                  <span
                    onClick={() => setActiveLanguage(lang)}
                    style={{ marginLeft: "20px" }}
                    className={`${landingPageStyles.langHoverItem}`}
                  >
                    {lang}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className={`${landingPageStyles.headerRight}`}>
        {isLoggedIn ? (
          <button
            className={`${landingPageStyles.signOutBtn}`}
            onClick={handleLogout}
          >
            Sign Out
          </button>
        ) : isSignUpOpen ? (
          <div>
            <span className={`${landingPageStyles.accountMessage}`}>
              Already Have an account?
            </span>
            <button
              className={`${landingPageStyles.signInBtn}`}
              onClick={toggleForm}
            >
              Sign in
            </button>
          </div>
        ) : (
          <>
            <span className={`${landingPageStyles.accountMessage}`}>
              Do not Have an account?
            </span>
            <button
              className={`${landingPageStyles.signInBtn}`}
              onClick={toggleForm}
            >
              Sign Up
            </button>
          </>
        )}
      </div> */}
    </div>
  );
}

export default Header;
