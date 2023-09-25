import {
  heading1,
  separator,
  mainTitle,
  vertical
} from "../../styles/index.module.scss";
import LabeledButton from "../common/button/LabeledButton";
import { StyleRoot } from "radium";
import animations from "../../config/animations";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
// import Image from 'next/image';

const Welcome = ({ changeLayout }) => {
  return (
    <StyleRoot className={"flex-1 flex align-center justify-center flex-column"}>
      <div style={animations.in} className={`flex ${mainTitle}`}>
        <img src={"/static/images/logo_mini.png"} height={"30"} alt={"Logo"} />
        <h1 className={heading1}>Connect & Play</h1>
      </div>
      <div className={`flex justify-center flex-column align-center`}>
        <LabeledButton
          buttonText={"Login"}
          onClick={() => {
            changeLayout("login");
          }}
          icon={<IoIosLogIn />}
          labelText={"Already a member?"}
        />
        {/*<div className={`${separator} ${vertical}`} />*/}
        <LabeledButton
          buttonText={"Register"}
          onClick={() => {
            changeLayout("register");
          }}
          icon={<AiOutlineUserAdd />}
          labelText={"Don't have an account?"}
        />
      </div>
    </StyleRoot>
  );
};
export default Welcome;
