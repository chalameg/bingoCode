import { useContext, useState } from "react";
import { footer, footerContainer } from "../../styles/index.module.scss";
import { footerPoweredBy } from "../../styles/landingPage.module.scss";
import FooterLink from "./FooterLink";
import { AppContext } from "../../common/context";

const Footer = () => {
  const { isBgWhite } = useContext(AppContext);

  return (
    <div className={`${footer}`}>
      <footer
        className={`${footerContainer} flex justify-between align-center`}
      >
        <FooterLink text={"About"} href={"about"} />
        <FooterLink text={"Blog"} href={"blog"} />
        {/* <FooterLink text={"Contact Us"} href={"contact"} /> */}
        <FooterLink text={"Privacy Policy"} href={"privacy"} />
        <FooterLink text={"Terms of Use"} href={"terms"} last={true} />
      </footer>
      <p
        style={isBgWhite ? { color: "#7D59F0" } : { color: "white" }}
        className={`${footerPoweredBy}`}
      >
        Powered By: 2play1
      </p>
    </div>
  );
};
export default Footer;
