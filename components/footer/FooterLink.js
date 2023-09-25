import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../common/context";
import { footerLink } from "../../styles/index.module.scss";

const FooterLink = ({ text, href, last }) => {
  const { isBgWhite } = useContext(AppContext);
  const { route } = useRouter();

  return (
    <>
      <div
        className={`flex justify-center ${footerLink}`}
        style={
          !isBgWhite
            ? { color: "white" }
            : route === `/${href}`
            ? { color: "#7D59F0" }
            : { color: "black" }
        }
      >
        <Link href={href}>
          <a>
            <span>{text}</span>
          </a>
        </Link>
      </div>
      {!last && <hr style={{ height: "20px" }} />}
    </>
  );
};
export default FooterLink;
